//pacotes
import { Router } from 'express'
import multer from 'multer'

//Controladores
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController'
import AppointmentController from './app/controllers/AppointmentController'
import ScheduleController from './app/controllers/ScheduleController'
import NotificationsController from './app/controllers/NotificationsController'

//arquivos de configuração
import authMiddlewares from './app/middlewares/auth'
import multerConfig from './config/multer'
import Database from './database'

const routes = new Router()
const upload = multer(multerConfig)

// inserção de usuários
routes.post('/users', UserController.store)

//login de sessão
routes.post('/session', SessionController.store)


// rotas autenticadas
routes.use(authMiddlewares)
routes.put('/users', UserController.update)

//criação agendamento
routes.post('/appointments', AppointmentController.store)


//listagem de agendamento
routes.get('/appointments', AppointmentController.index)

// listagem de colaboradores
routes.get('/collaborator', CollaboratorController.index)

// listagem de agendamentdos de um colaborador
routes.get('/schedule', ScheduleController.index)

// listagem de notificações
routes.get('/notifications', NotificationsController.index)

//marcar notificações como lidas
routes.put('/notifications/:id', NotificationsController.update)


//upload de arquivos
routes.post('/files', upload.single('file'), FileController.store)

export default routes