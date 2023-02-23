import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { default as routerOrganizations } from './routers/routerOrganizations.js';
import { default as routerSilobags } from './routers/routerSilobags.js';
import { default as routerMeasurments } from './routers/routerMeasurments.js';
import { default as routerLocalities } from './routers/routerLocalities.js';
import { default as routerUsers } from './routers/routerUsers.js';
import { default as routerPermissions } from './routers/routerPermissions.js';
import { default as routerDeviceTypes } from './routers/routerDeviceTypes.js';
import { default as routerDevices } from './routers/routerDevices.js';
import { default as routerDeviceStates } from './routers/routerDeviceStates.js';
import { default as routerLots } from './routers/routerLots.js';
import { default as routerDeviceNetTypes } from './routers/routerDeviceNetTypes.js';
import { default as routerRoles } from './routers/routerRoles.js';



const app = express();

const port = process.env.PORT_SERVER || 2000;
const timeZone = process.env.TIME_ZONE || 'America/Argentina/Buenos_Aires';
const language = process.env.LANGUAGE || 'es-AR';

let sequence = 0;

app.enable('trust proxy');
app.disable('x-powered-by');
app.use(cors());
app.options('*', cors());

app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(bodyParser.json({
    limit: '10mb',
    extended: true
}));

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use("/organizations", routerOrganizations);

app.use("/silobags", routerSilobags);

app.use("/measurements", routerMeasurments);

app.use("/users", routerUsers);

app.use("/permissions", routerPermissions);

app.use("/deviceTypes", routerDeviceTypes);

app.use("/deviceStatuses", routerDeviceStates);

app.use("/deviceNetTypes", routerDeviceNetTypes);

app.use("/devices", routerDevices);

app.use("/roles", routerRoles);

app.use("/localities", routerLocalities)

app.use("/lots", routerLots)

app.listen(2000, () => console.log(`${(new Date()).toLocaleString(language, { timeZone })} [${sequence++}] Server iniciado en el puerto: ${port}`));