import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Mente Nexus API is flying on http://localhost:${PORT}`);
});
