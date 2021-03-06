import User from '../models/User'
import * as Yup from 'yup'

class UserController{
    async store(req, res){

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required().min(5)


        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({message: 'falha na validação'})
        }




        const userExist = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(userExist){
            return res.status(400).json({
                error: "Usuário já cadastrado"
            })
        }
        const {id, name, email, provider} = await User.create(req.body)
        

        return res.json({
            id,
            name,
            email,
            provider
        })
    }
    async update(req,res){

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string(),
            oldPassword: Yup.string().min(5),
            password: Yup.string().min(5).when(
                'oldPassword', (oldPassword, field) => 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password',
            (password, field) => password ? field.required().oneOf([Yup.ref('password')]) : field
            )


        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({message: 'falha na validação'})
        }

        const {email, oldPassword} = req.body
        const user = await User.findByPk(req.userId)
        if(email && email !== user.email){
            const userExist = await User.findOne({
                where: {
                    email
                }
            })
            if(userExist){
                return res.status(400).json({
                    error: "Usuário já cadastrado"
                })
            }
        }
        if( oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({message: 'senha não confere'})
        }
        const {id,name,provider} = await user.update(req.body)
        
        
        
        return res.json({
            id,
            name,
            email,
            provider
        })
    }

}
    

export default new UserController()