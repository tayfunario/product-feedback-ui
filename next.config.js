module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/suggestions',
                permanent: true
            },
        ]
    },
}