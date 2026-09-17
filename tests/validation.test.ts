import { expect } from "chai";

import { Validation } from "../src/utils/validators";

describe("Validation", (): void => {
    // =========================
    // REQUIRED
    // =========================

    describe("isRequired", (): void => {
        it("should return true for non-empty value", (): void => {
            expect(Validation.isRequired("Hello")).to.equal(true);
        });

        it("should return false for empty value", (): void => {
            expect(Validation.isRequired("")).to.equal(false);
        });

        it("should return false for spaces", (): void => {
            expect(Validation.isRequired("   ")).to.equal(false);
        });
    });

    // =========================
    // USER ID
    // =========================

    describe("isUserIdValid", (): void => {
        it("should accept digits only", (): void => {
            expect(Validation.isUserIdValid("12345")).to.equal(true);
        });

        it("should reject letters", (): void => {
            expect(Validation.isUserIdValid("123abc")).to.equal(false);
        });

        it("should reject spaces", (): void => {
            expect(Validation.isUserIdValid("12 34")).to.equal(false);
        });
    });

    // =========================
    // PUBLICATION YEAR
    // =========================

    describe("isPublicationYearValid", (): void => {
        it("should accept four digits", (): void => {
            expect(Validation.isPublicationYearValid("1937")).to.equal(true);
        });

        it("should reject three digits", (): void => {
            expect(Validation.isPublicationYearValid("937")).to.equal(false);
        });

        it("should reject five digits", (): void => {
            expect(Validation.isPublicationYearValid("19370")).to.equal(false);
        });

        it("should reject letters", (): void => {
            expect(Validation.isPublicationYearValid("19ab")).to.equal(false);
        });
    });

    // =========================
    // NAME
    // =========================

    describe("isNameValid", (): void => {
        it("should accept normal name", (): void => {
            expect(Validation.isNameValid("John Smith")).to.equal(true);
        });

        it("should accept Ukrainian letters", (): void => {
            expect(Validation.isNameValid("Іван Петренко")).to.equal(true);
        });

        it("should accept dots and hyphens", (): void => {
            expect(Validation.isNameValid("J.R.R. Tolkien")).to.equal(true);

            expect(Validation.isNameValid("Jean-Paul")).to.equal(true);
        });

        it("should reject numbers", (): void => {
            expect(Validation.isNameValid("John123")).to.equal(false);
        });

        it("should reject special characters", (): void => {
            expect(Validation.isNameValid("John@Smith")).to.equal(false);
        });
    });
});
