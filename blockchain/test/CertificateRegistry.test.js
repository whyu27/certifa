const { expect } = require("chai");
const { ethers } = require("hardhat");

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("CertificateRegistry", function () {
  let CertificateRegistry;
  let registry;
  let owner;
  let issuer1;
  let issuer2;
  let unauthorizedUser;
  let recipient;

  const SAMPLE_CERT = {
    certId: "CERT-2026-8F92A1",
    hash: ethers.keccak256(ethers.toUtf8Bytes("sample certificate file content")),
    ipfsCID: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    recipient: "Alex Morgan",
    title: "Certified Smart Contract Engineer"
  };

  beforeEach(async function () {
    [owner, issuer1, issuer2, unauthorizedUser, recipient] = await ethers.getSigners();

    CertificateRegistry = await ethers.getContractFactory("CertificateRegistry");
    registry = await CertificateRegistry.deploy();
    await registry.waitForDeployment();
  });

  describe("Deployment & Initial State", function () {
    it("Should set the deployer as owner", async function () {
      expect(await registry.owner()).to.equal(owner.address);
    });

    it("Should set deployer as initial authorized issuer", async function () {
      expect(await registry.isAuthorizedIssuer(owner.address)).to.be.true;
    });

    it("Should return total certificates as 0 initially", async function () {
      expect(await registry.getTotalCertificates()).to.equal(0);
    });
  });

  describe("Issuer Management (addIssuer / removeIssuer)", function () {
    it("Should allow owner to add a new authorized issuer", async function () {
      await expect(registry.connect(owner).addIssuer(issuer1.address))
        .to.emit(registry, "IssuerAdded")
        .withArgs(issuer1.address);

      expect(await registry.isAuthorizedIssuer(issuer1.address)).to.be.true;
    });

    it("Should allow owner to remove an authorized issuer", async function () {
      await registry.connect(owner).addIssuer(issuer1.address);
      expect(await registry.isAuthorizedIssuer(issuer1.address)).to.be.true;

      await expect(registry.connect(owner).removeIssuer(issuer1.address))
        .to.emit(registry, "IssuerRemoved")
        .withArgs(issuer1.address);

      expect(await registry.isAuthorizedIssuer(issuer1.address)).to.be.false;
    });

    it("Should revert if non-owner attempts to add or remove an issuer", async function () {
      await expect(
        registry.connect(unauthorizedUser).addIssuer(issuer1.address)
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount");

      await expect(
        registry.connect(unauthorizedUser).removeIssuer(owner.address)
      ).to.be.revertedWithCustomError(registry, "OwnableUnauthorizedAccount");
    });
  });

  describe("Certificate Issuance (issueCertificate)", function () {
    beforeEach(async function () {
      await registry.connect(owner).addIssuer(issuer1.address);
    });

    it("Should allow authorized issuer to issue a certificate", async function () {
      const tx = await registry.connect(issuer1).issueCertificate(
        SAMPLE_CERT.certId,
        SAMPLE_CERT.hash,
        SAMPLE_CERT.ipfsCID,
        SAMPLE_CERT.recipient,
        SAMPLE_CERT.title
      );

      const certIdHash = ethers.keccak256(ethers.toUtf8Bytes(SAMPLE_CERT.certId));

      await expect(tx)
        .to.emit(registry, "CertificateIssued")
        .withArgs(
          SAMPLE_CERT.certId,
          certIdHash,
          issuer1.address,
          SAMPLE_CERT.hash,
          SAMPLE_CERT.ipfsCID,
          SAMPLE_CERT.recipient,
          SAMPLE_CERT.title,
          anyValue
        );

      expect(await registry.getTotalCertificates()).to.equal(1);
    });

    it("Should reject issuance from an unauthorized caller", async function () {
      await expect(
        registry.connect(unauthorizedUser).issueCertificate(
          SAMPLE_CERT.certId,
          SAMPLE_CERT.hash,
          SAMPLE_CERT.ipfsCID,
          SAMPLE_CERT.recipient,
          SAMPLE_CERT.title
        )
      ).to.be.revertedWithCustomError(registry, "UnauthorizedIssuer")
        .withArgs(unauthorizedUser.address);
    });

    it("Should reject duplicate Certificate ID", async function () {
      await registry.connect(issuer1).issueCertificate(
        SAMPLE_CERT.certId,
        SAMPLE_CERT.hash,
        SAMPLE_CERT.ipfsCID,
        SAMPLE_CERT.recipient,
        SAMPLE_CERT.title
      );

      await expect(
        registry.connect(issuer1).issueCertificate(
          SAMPLE_CERT.certId,
          SAMPLE_CERT.hash,
          SAMPLE_CERT.ipfsCID,
          "Another Person",
          "Another Title"
        )
      ).to.be.revertedWithCustomError(registry, "CertificateAlreadyExists")
        .withArgs(SAMPLE_CERT.certId);
    });

    it("Should revert if parameters are empty", async function () {
      await expect(
        registry.connect(issuer1).issueCertificate(
          "",
          SAMPLE_CERT.hash,
          SAMPLE_CERT.ipfsCID,
          SAMPLE_CERT.recipient,
          SAMPLE_CERT.title
        )
      ).to.be.revertedWithCustomError(registry, "InvalidParameters");
    });
  });

  describe("Public Verification & Read (getCertificate)", function () {
    beforeEach(async function () {
      await registry.connect(owner).addIssuer(issuer1.address);
      await registry.connect(issuer1).issueCertificate(
        SAMPLE_CERT.certId,
        SAMPLE_CERT.hash,
        SAMPLE_CERT.ipfsCID,
        SAMPLE_CERT.recipient,
        SAMPLE_CERT.title
      );
    });

    it("Should allow anyone to verify a valid certificate by ID", async function () {
      const cert = await registry.connect(unauthorizedUser).getCertificate(SAMPLE_CERT.certId);

      expect(cert.certId).to.equal(SAMPLE_CERT.certId);
      expect(cert.certificateHash).to.equal(SAMPLE_CERT.hash);
      expect(cert.ipfsCID).to.equal(SAMPLE_CERT.ipfsCID);
      expect(cert.issuer).to.equal(issuer1.address);
      expect(cert.recipient).to.equal(SAMPLE_CERT.recipient);
      expect(cert.title).to.equal(SAMPLE_CERT.title);
      expect(cert.revoked).to.be.false;
      expect(cert.exists).to.be.true;
    });

    it("Should revert with CertificateNotFound for non-existent ID", async function () {
      await expect(
        registry.connect(unauthorizedUser).getCertificate("CERT-NOT-EXIST")
      ).to.be.revertedWithCustomError(registry, "CertificateNotFound")
        .withArgs("CERT-NOT-EXIST");
    });

    it("Should return certificates list by issuer", async function () {
      const issuerCerts = await registry.getCertificatesByIssuer(issuer1.address);
      expect(issuerCerts.length).to.equal(1);
      expect(issuerCerts[0]).to.equal(SAMPLE_CERT.certId);
    });

    it("Should return all registered certificate IDs", async function () {
      const allCerts = await registry.getAllCertificateIds();
      expect(allCerts.length).to.equal(1);
      expect(allCerts[0]).to.equal(SAMPLE_CERT.certId);
    });
  });

  describe("Certificate Revocation (revokeCertificate)", function () {
    beforeEach(async function () {
      await registry.connect(owner).addIssuer(issuer1.address);
      await registry.connect(issuer1).issueCertificate(
        SAMPLE_CERT.certId,
        SAMPLE_CERT.hash,
        SAMPLE_CERT.ipfsCID,
        SAMPLE_CERT.recipient,
        SAMPLE_CERT.title
      );
    });

    it("Should allow the original issuer to revoke their certificate", async function () {
      const certIdHash = ethers.keccak256(ethers.toUtf8Bytes(SAMPLE_CERT.certId));

      await expect(registry.connect(issuer1).revokeCertificate(SAMPLE_CERT.certId))
        .to.emit(registry, "CertificateRevoked")
        .withArgs(
          SAMPLE_CERT.certId,
          certIdHash,
          issuer1.address,
          anyValue
        );

      const cert = await registry.getCertificate(SAMPLE_CERT.certId);
      expect(cert.revoked).to.be.true;
    });

    it("Should allow contract owner to revoke a certificate", async function () {
      await expect(registry.connect(owner).revokeCertificate(SAMPLE_CERT.certId))
        .to.emit(registry, "CertificateRevoked");

      const cert = await registry.getCertificate(SAMPLE_CERT.certId);
      expect(cert.revoked).to.be.true;
    });

    it("Should reject revocation from an unauthorized user", async function () {
      await expect(
        registry.connect(unauthorizedUser).revokeCertificate(SAMPLE_CERT.certId)
      ).to.be.revertedWithCustomError(registry, "UnauthorizedRevocation")
        .withArgs(unauthorizedUser.address);
    });

    it("Should reject revoking an already revoked certificate", async function () {
      await registry.connect(issuer1).revokeCertificate(SAMPLE_CERT.certId);

      await expect(
        registry.connect(issuer1).revokeCertificate(SAMPLE_CERT.certId)
      ).to.be.revertedWithCustomError(registry, "CertificateAlreadyRevoked")
        .withArgs(SAMPLE_CERT.certId);
    });
  });
});
