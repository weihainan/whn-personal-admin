Date.prototype.Format = function (fmt) {
    let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
}

export default {
    returnTimeString(dateString) {
        if (typeof dateString == 'undefined' || dateString == null || dateString.length < 19) {
            return ' '
        }
        let date = this.returnUTCDate(dateString)
        let year = `${date.getFullYear()}`
        let month = `${date.getMonth() + 1}`
        let day = `${date.getDate()}`
        let hour = `${date.getHours()}`
        let minute = `${date.getMinutes()}`
        let seconds = `${date.getSeconds()}`

        month = month.length < 2 ? `0${month}` : month
        day = day.length < 2 ? `0${day}` : day
        hour = hour.length < 2 ? `0${hour}` : hour
        minute = minute.length < 2 ? `0${minute}` : minute
        seconds = seconds.length < 2 ? `0${seconds}` : seconds

        return `${year}.${month}.${day}`
    },
    returnISO8601String(timeStamp) {
        return new Date(timeStamp).toISOString().replace('Z', '+0800')
    },
    returnTimeStamp(dateString) {
        if (!dateString || dateString.length < 19) {
            return ''
        }
        let date = this.returnUTCDate(dateString)
        return date.getTime()
    },

    returnDifferenceState(dateString) {
        if(typeof dateString != 'string') return false

        if (dateString.length < 19) return false

        let date = this.returnUTCDate(dateString)

        let utc = date.getTime()
        let currentTime = new Date().getTime()
        let timeDifference = utc - currentTime
        if (timeDifference < 0) {
            return false
        }
        return true
    },
    returnUTCDate(dateString) {
        let regexp = '([0-9]{4})(-([0-9]{2})(-([0-9]{2})' +
            '(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?' +
            '((([-+])([0-9]{2})([0-9]{2})))?)?)?)?'
        if (typeof dateString == 'undefined' || dateString.length < 19) {
            return ' '
        }
        let d = dateString.match(new RegExp(regexp))
        let offset = 0
        let date = new Date(d[1], 0, 1)

        if (d[3]) {
            date.setMonth(d[3] - 1)
        }
        if (d[5]) {
            date.setDate(d[5])
        }
        if (d[7]) {
            date.setHours(d[7])
        }
        if (d[8]) {
            date.setMinutes(d[8])
        }
        if (d[10]) {
            date.setSeconds(d[10])
        }
        if (d[12]) {
            date.setMilliseconds(Number('0.' + d[12]) * 1000)
        }
        if (d[14]) {
            offset = (Number(d[16]) * 60) + Number(d[17])
            offset *= ((d[15] == '-') ? 1 : -1)
        }
        offset -= date.getTimezoneOffset()
        let time = (Number(date) + (offset * 60 * 1000))
        date = new Date(time)
        return date
    },

    returnDiffDate(dateStr) {
        let now = new Date().getTime()
        let dateTimeStamp = this.returnTimeStamp(dateStr)
        let minute = 1000 * 60
        let hour = minute * 60
        let diffValue = now - dateTimeStamp
        //if(diffValue < 0) { return }
        let hourC =diffValue/hour
        let minC =diffValue/minute
        let result

        if(minC < 15) {
            result='刚刚'
        }else if(minC >= 15 && minC < 30) {
            result='15分钟前'
        }else if(minC >= 30 && minC < 45) {
            result='30分钟前'
        }else if(minC >= 45 && minC <= 59) {
            result = '45分钟前'
        }else if(hourC >= 1 && new Date(dateTimeStamp).Format('yyyy-MM-dd') == new Date().Format('yyyy-MM-dd')) {
            result = ''+ parseInt(hourC) + '小时前'
        }else {
            result = new Date(dateTimeStamp).Format('yyyy-MM-dd hh:mm')
        }
        return result
    },

    getLocalTime(timeStamp) {
        if(timeStamp == null || typeof timeStamp == 'undefined' || timeStamp == '') return ''
        let time = new Date(timeStamp*1000)
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let seconds = time.getSeconds()
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        hour = hour < 10 ? `0${hour}` : hour
        minute = minute < 10 ? `0${minute}` : minute
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
    },

    getLocalDateTime(timeStamp) {
        if(timeStamp == null || typeof timeStamp == 'undefined' || timeStamp == '') return ''
        let time = new Date(timeStamp*1000)
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let seconds = time.getSeconds()
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        hour = hour < 10 ? `0${hour}` : hour
        minute = minute < 10 ? `0${minute}` : minute
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${year}年${month}月${day}日`
    },

    getCurrentYearMonth() {
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let seconds = time.getSeconds()
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        hour = hour < 10 ? `0${hour}` : hour
        minute = minute < 10 ? `0${minute}` : minute
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${year}年${month}月`
    },

    getCurrentYearMonthForQuery() {
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth()+1
        let day = time.getDate()
        let hour = time.getHours()
        let minute = time.getMinutes()
        let seconds = time.getSeconds()
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        hour = hour < 10 ? `0${hour}` : hour
        minute = minute < 10 ? `0${minute}` : minute
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${year}-${month}`
    },

    getCurrentYearMonthForOption() {
        let option = []
        let time = new Date()
        let year = time.getFullYear()
        let month = time.getMonth()+1
        month = month < 10 ? `0${month}` : month
        for(let i=month; i>0; i--) {
            let obj = {
                option: ` ${year}-${i < 10 ? `0${i}` : i}  `,
                value: `${year}-${i < 10 ? `0${i}` : i}`
            }
            option.push(obj)
        }
        return option
    },

    /**
     * 获取起始时间
     * */
    getStartTime(type) {
        let now = new Date()
        let nowDayOfWeek = now.getDay() //今天本周的第几天
        let nowDay = now.getDate() //当前日
        let nowMonth = now.getMonth() //当前月
        let currentYear = now.getFullYear()
        let startTime = 0
        if(type === 'current_week') { // 本周
            startTime = now.getTime() - 1000*60*60*24*(nowDayOfWeek-1) // 减一是因为需求要求本周从周一开始
        }else if(type === 'nearly_two_weeks') { // 近两周
            startTime = now.getTime() - 1000*60*60*24*(nowDayOfWeek-1+7)
        }else if(type === 'nearly_three_weeks') { // 近三周
            startTime = now.getTime() - 1000*60*60*24*(nowDayOfWeek-1+14)
        }else if(type === 'current_mouth') { //本月
            startTime = now.getTime() - 1000*60*60*24*(nowDay-1)
        }else if(type === 'nearly_two_mouths') { // 近两个月
            startTime = this.getPriorMonthFirstDay(currentYear,nowMonth).getTime()
        }else if(type === 'nearly_three_mouths') { // 近三个月
            startTime = this.getPriorMonthFirstDay(currentYear,nowMonth-1).getTime()
        }else if(type === 'nearly_six_mouths') { // 近六个月
            startTime = this.getPriorMonthFirstDay(currentYear,nowMonth-4).getTime()
        }else if(type === 'current_year') { // 本年度
            startTime = new Date(currentYear,0,1).getTime()
        }
        return startTime
    },
    /**
     * 返回上个月第一天
     * */
    getPriorMonthFirstDay(year,month) {
        if(month == 0) {
            month = 11 //月份为上年的最后月份
            year-- //年份减1
            return new Date(year,month,1)
        }
        month--
        return new Date(year,month,1)
    },

    getDateByCount(count) {
        let dd = new Date()
        dd.setDate(dd.getDate()+count)
        return dd.getTime()
    }
}
