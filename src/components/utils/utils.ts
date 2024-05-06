export const getRemainingTime = (time: string) => {
    const updatedAtTimestamp = parseInt(time, 10);
    const updatedAtDate = new Date(updatedAtTimestamp * 1000);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - updatedAtDate.getTime();
    const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    const remainingSeconds = timeDifferenceInSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return hours > 0 ? `${hours} hours ago` : minutes > 0 ? `${minutes} minutes ago` : `${seconds} seconds ago`;
};

interface EnvKeyValue {
    key: string;
    value: string;
};

export const transformEnvKeys = (content: string) => {
    const lines = content.split('\n');
    const pairs: EnvKeyValue[] = lines.map(line => {
        const [key, ...values] = line.split('=');
        return {
            key: key.trim(),
            value: values.join('=').trim()
        };
    });
    return pairs;
};