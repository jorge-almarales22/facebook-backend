import bcrypt from 'bcryptjs';
import {pool} from '../database/config.js';
import { generateJWT } from '../helpers/generateJWT.js';

export const ping = (req, res) => {
    res.status(200).json({message: 'pong'})
}

export const login = async(req, res) => {

    const {email, password} = req.body;
    const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if(!user[0]){
        return res.status(400).json({
            msg: 'Invalid data'
        })
    }

    if(!bcrypt.compareSync(password, user[0].password)){
        return res.status(400).json({
            msg: 'Invalid data'
        })
    }

    const token = await generateJWT({id: user[0].id, name: user[0].name, email: user[0].email})

    delete user[0].password

    res.status(200).json({
        token,
        ...user[0]
    })
}

export const signup = async(req, res) => {

    try {
        const {name, email, password} = req.body;
    
        var hash = bcrypt.hashSync(password, 5);
    
        const [resp] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash]);
    
        if(resp.affectedRows === 0) {
            return res.status(400).json({
                msg: 'Invalid data'
            })
        }
    
        const token = await generateJWT({id: resp.insertId, name, email})
        
        res.status(200).json({
            token,
            email,
            password,
            name
        })

    } catch (error) {

        console.log(error);
    }



}