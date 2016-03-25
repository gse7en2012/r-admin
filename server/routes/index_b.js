/**
 * Created by zhuzhipeng on 16/3/10.
 */

const express = require('express');
const router  = new express.Router();
const path    = require('path');
const fs      = require('fs');
router.get('/', (req, res)=> {
    res.sendFile(path.resolve('client/dist/index.html'));
});

router.get('/t', (req, res)=> {
    res.sendFile(path.resolve('i.html'));
});


router.get('/api',(req,res)=>{
    res.status(200).json({
        code:200,
        message:'OK!'
    })
});

router.post('/api',(req,res)=>{
    res.cookie('name', 'tobi');
    res.send('ok')
});
router.post('/apia',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*');
    res.cookie('55', 'tobi', { domain:'.imaibo.com'});
    res.cookie('656', '565', { domain:'.ii.com'});
    res.send('ok')
});




module.exports = router;
