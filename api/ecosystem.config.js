module.exports = {
  apps: [
    {
      name: "auth-service",
      script: "./auth-service/dist/src/main.js", // Servis normal yang sudah di-build
    },
    {
      name: "user-service",
      script: "./user-service/dist/src/main.js", 
    },
    {
      name: "destination-service",
      script: "./destination-service/dist/src/main.js", 
    },
    {
      name: "gateway-service",
      script: "./gateway-service/dist/main.js", 
    },
    
    {
      name: "mail-service",
      script: "npm",
      args: "run start",
      cwd: "./mail-service",
    }
  ]
};