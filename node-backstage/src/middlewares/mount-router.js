import fs from 'fs';
import path from 'path'

export default {
    configure: (routerPath, options) => {
        // 在这里 我们采用同步的方式
        const files = fs.readdirSync(routerPath);
        files.forEach(f => {
            const modulePath = path.join(routerPath, f);
            require(modulePath).default && options.express.use(require(modulePath).default);
        })

    }
}