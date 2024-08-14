const ratelimiterips = {}

const ratelimiter = (req,res,next)=>{
   

    const window_time = 60*1000;
    let current_time = Date.now()
    let ip = req.ip;
    let max_requests = 10;

    if(!ratelimiterips[ip]){
        ratelimiterips[ip] = []
    }

   ratelimiterips[ip] = ratelimiterips[ip].filter((timestamp)=>current_time-timestamp<window_time)
    
   console.log(ratelimiterips)
   if(ratelimiterips[ip].length>=max_requests){

    let firstip = ratelimiterips[ip][0]

    let waittime = Math.ceil((window_time-(current_time-firstip))/1000)
        res.status(429).json({
            message:`Too many requests. Please wait ${waittime}s for next requests`
        })
    }


    ratelimiterips[ip].push(current_time)
    console.log(ratelimiterips)
    next()

}

module.exports= {ratelimiter}