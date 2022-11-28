const app = require("./express");
const cors = require('cors');
app.use(cors({

    origin: "*"

}));


const PORT = 5000;
app.listen(PORT, () => {
    try {
        const options = {
            key: fs.readFileSync("/etc/letsencrypt/live/api.nftindia.foundation/privkey.pem"),
            cert: fs.readFileSync("/etc/letsencrypt/live/api.nftindia.foundation/fullchain.pem"),
        }
        console.log("server Started at port 5000");
    } catch (error) {
        console.log("error in catch : ", error);
    }
})

