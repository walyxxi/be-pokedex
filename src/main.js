import { logger } from "./application/logging.js";
import { web } from "./application/web.js";

const port = 3001;

web.listen(port, () => {
  logger.info(`App Start on PORT ${port}`);
});
