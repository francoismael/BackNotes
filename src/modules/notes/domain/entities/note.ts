export class Note {
    constructor(
        public readonly id: String,
        public title: String,
        public content: String,
        public readonly userId: String,
    ){}
}
