// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const quotes = (req, res) => {
  // Open Chrome DevTools to step through the debugger!
  // debugger;
  res.status(200).json({ name: 'Hello, world! :D' });
};

export default quotes;