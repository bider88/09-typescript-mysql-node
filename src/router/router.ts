import { Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', ( req: Request, res: Response ) => {

    const query = ` SELECT * FROM heroes `;

    MySQL.execQuery(query, (err: any, heroes: Object[]) => {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                data: heroes
            })
        }
    })
})

router.get('/heroes/:id', ( req: Request, res: Response ) => {
    
    const { id } = req.params;

    const escapedId =  MySQL.instance.connection.escape(id);

    const query = ` SELECT * FROM heroes WHERE id = ${escapedId} `;

    MySQL.execQuery(query, (err: any, heroes: Object[]) => {
        if(err) {
            res.status(400).json({
                ok: false,
                error: err
            })
        } else {
            res.json({
                ok: true,
                data: heroes[0]
            })
        }
    })
})

export default router;