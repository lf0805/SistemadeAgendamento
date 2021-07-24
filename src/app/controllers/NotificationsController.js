import User from '../models/User'
import Notifications from '../schema/Notification'


class NotificationsController{
    async index(req,res){
        const checkIsCollaborator = await User.findOne({
            where: {id: req.userId, provider: true}
        })
        if(!checkIsCollaborator){
            return res.status(401).json({error: 'Usuário não é colaborador'})
        }
        const notifications = await Notifications.find({
            user: req.userId
            
        }).sort({createdAt: 'desc'}).limit(20)

        return res.json(notifications)

    }
    async update(req,res){
        const readNotifications = await Notifications.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new: true}
        )
        return res.json(readNotifications)
    }

}







export default new NotificationsController()