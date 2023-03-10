const db =require('../models');
const router=require('express').Router();



// get workouts

router.get("/api/workouts",(req,res)=>{
    db.Workout.find({}).then(dbWorkout =>{

        dbWorkout.forEach(workout =>{
            const total =0;
            workout.exercises.forEach(e =>{
                total +=e.duration;
            });
            workout.totalDuration=total;
        });
        res.json(dbWorkout);

    }).catch(err =>{
        res.json(err);
    });
});


// exercise

router.put("/api/workouts/:id",(req,res)=>{
    db.workout.findOneAndUpdate(
        {_id:req.params.id},
        {
            $inc:{totalDuration:req.body.duration},
            $push:{exercises:req.body}
        },
        {
            new:true
        })
        .then(dbWorkout =>{
            res.json(dbWorkout);
        }).catch(err =>{
            res.json(err);
        });
});


// workout
router.post("/api/workouts",({body},res)=>{
    console.log("Workout to be added")
    console.log(body);

    db.workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err =>{
        res.json(err);
    });
});

// workouts in range
router.get("/api/workouts/range",(req,res)=>{

    db.Workout.find({}).then(dbWorkout =>{
        console.log("all workouts");
        console.log(dbWorkout);

        res.json(dbWorkout);
    }).catch(err =>{
        res.json(err);
    });
});



module.exports =router;



