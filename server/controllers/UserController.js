const User =require('../models/schedule')


module.exports={
    add: async (req, res) => {
        try {
            const adduser = new User({ ...req.body })
            const result = await adduser.save()
            console.log(result)
            res.status(201).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    getUser: async (req, res) => {
        try {
            const findUser = await User.findOne(req.params)
            res.status(200).send(findUser)
        } catch (error) {
            res.status(500).send(error)

        }
    },
    delete: async (req, res) => {
        try { 
            const deleteUser = req.params;
            const result = await User.deleteOne(deleteUser)
            if (result.deletedCount === 1){
                res.status(201).send('Schedule deleted')

            } else {
                res.status(201).send('something went wrong')
            }
            
        } catch (error) {
            res.status(500).send(error)

        }
    }
}