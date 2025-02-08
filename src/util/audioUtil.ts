export async function playAudio(
    audio: HTMLAudioElement,
    durationMs: number,
    stopCallback: () => void
): Promise<void> {
    await audio.play();
    setTimeout(() => {
        stopAudio(audio, stopCallback);
    }, durationMs)
}

export function stopAudio(
    audio: HTMLAudioElement,
    stopCallback: () => void
): void {
    audio.pause();
    stopCallback();
}

export function getPlayDurationMs(numGuesses: number, isGameOver: boolean): number {
    if (isGameOver) {
        return 30000;
    }
    switch (numGuesses) {
        case 0:
            return 500;
        case 1:
            return 1000;
        case 2:
            return 2000;
        case 3:
            return 3500;
        case 4:
            return 6000;
        case 5:
            return 10000;
    }
}