export default function (identifiedObjects) {
    return identifiedObjects.reduce(
        (memo, current) => {
            memo[current.id] = current
            return memo
        },

        {}
    )
}
