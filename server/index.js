const app = require('./app');
const PORT  = process.env.PORT||4000;


// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received.');
    await prisma.$disconnect();
    process.exit(0);
  });
  
  process.on('SIGINT', async () => {
    console.log('SIGINT signal received.');
    await prisma.$disconnect();
    process.exit(0);
  });

  

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})