id("course_main_start_tv").findOne().click()
while(true){
    let playButton = id("item_catalog_child_video_iv").selected(false).findOne(1000);
    let getVideoPlayingTimeFailedCount = 0
    if (playButton != null){
        playButton.parent().click()
        sleep(2000)
        while(true){
            let videoPosition = className("com.easefun.polyv.mediasdk.example.widget.media.TextureRenderView").findOne().bounds()
            click(videoPosition.centerX()/2, videoPosition.centerY())
            sleep(1500)
            let curTime = id("tv_curtime").findOnce()
            let tottime = id("tv_tottime").findOnce()
            if (curTime != null && tottime != null){
                console.log("获取视频播放时间成功！")
                getVideoPlayingTimeFailedCount = 0
                let curTimeText = curTime.text()
                let tottoTimeText = tottime.text()
                console.log(curTimeText, tottoTimeText);
                if (curTimeText == tottoTimeText){
                    id("title_back_iv").findOne().click()
                    sleep(2000)
                    break
                }
            }
            else{
                getVideoPlayingTimeFailedCount++
                console.log("获取视频播放时间失败", getVideoPlayingTimeFailedCount, "次")
                // toast("获取视频播放时间失败"+getVideoPlayingTimeFailedCount+"次")
                if(getVideoPlayingTimeFailedCount == 5){
                    console.log("失败次数异常，强制退出")
                    toast("失败次数异常，强制退出")
                    id("title_back_iv").findOne().click()
                    sleep(2000)
                    break
                }
            }
        }

    }
    else{
        console.log("not found");
        let deviceCenterX = device.width/2
        let deviceCenterY = device.height/2
        swipe(deviceCenterX, deviceCenterY, deviceCenterX, deviceCenterY-300, 1000)
        console.log("滑动完毕")
        if (id("item_catalog_child_video_iv").selected(false).findOne(2000) != null){
            console.log("find new Video!")
            sleep(2000)
            continue;
        }
        else{
            log("go find new list")
            let isNewListHave = id("item_catalog_group_arrow_iv").selected(false).findOne(2000)
            if (isNewListHave != null){
                log("find new List!")
                let newListPosition = isNewListHave.parent().bounds()
                click(newListPosition.centerX(), newListPosition.centerY())
                sleep(2000)
            }
            
        }
    }

}