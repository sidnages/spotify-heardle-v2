export const enum GameStatus {
    IN_PROGRESS,
    CORRECT,
    OUT_OF_GUESSES
}

export const enum GuessStatus {
    None,
    Skip,
    Incorrect,
    Partial,
    Correct
}