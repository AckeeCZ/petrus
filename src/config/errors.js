export class PetrusError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PetrusError';
    }
}
