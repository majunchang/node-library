import {book} from '../models'

// 添加书籍
export function addBook(req, res, next) {
    var FormData = JSON.parse(req.body).FormData;
    // 接受到数据  将数据存储进数据库中
    book.findOne({
        bookName: FormData.bookName
    }).then(result => {
        if (result) {
            res.json({
                code: 1,
                message: '你已经添加过这本书籍，不能重复添加'
            })
            return null;
        }
        var tf = function (i) {
            return (i < 10 ? "0" : "") + i
        };
        var d = new Date(FormData.date)
        var youWant = d.getFullYear() + '-' + tf(d.getMonth() + 1) + '-' + tf(d.getDate())
        // console.log(JSON.stringify(FormData));
        // console.log(FormData.bookCount);
        const newBook = new book({
            bookName: FormData.bookName,
            authorName: FormData.authorName,
            publishHouse: FormData.publishHouse,
            date: youWant,
            priceNum: FormData.priceNum,
            category: FormData.category,
            bookCount: FormData.bookCount,
            desc: FormData.desc
        })
        return newBook.save()
    })
        .then((docs) => {
            if (docs) {
                res.json({
                    code: 0,
                    message: '您已经成功添加了一本书籍'
                })
            }
        }).catch(err => {
        res.json({
            code: 500,
            message: '添加书籍失败'
        })
        console.log(err);
    })
}

//查询全部书籍
export function getAllBook(req, res, next) {
    // 从数据库中进行查询
    /*
     1 首先从页码中 获取的前端传送的 每一个页面的数据条数和页码数
     2 然后通过mongoose的api 进行筛选查询
     */
    let {page, pageSize} = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
    var totalNum = 0;
    book.find()
        .exec((err, docs) => {
            if (err) {
                console.log(err);
                return;
            }
            // console.log('majunchang');
            totalNum = docs.length
            if (docs.length === 0) {
                res.json({
                    code: 0,
                    result: [],
                    totalNum: 0
                })
                return;
            }
            console.log(docs.length);
            console.log('majunchang');
            book.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec((err, bookArr) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // bookArr.forEach((book,index)=>{
                    //     book.date = new Date(book.date).getTime();
                    //     console.log(book.date);
                    // })
                    res.json({
                        code: 0,
                        result: bookArr,
                        totalNum: totalNum
                    })
                })
        })
}

// 将需要更新的原始数据返回给前端
export function getUpdateBook(req, res, next) {
    let {bookId} = req.query;
    book.findById(bookId)
        .then((book) => {
            res.json({
                code: 0,
                result: book
            })
        })
        .catch((err) => {
            if (err) {
                res.json({
                    code: 500,
                    message: '更新书籍失败'
                })
                console.log(err);
                return
            }
        })
}

// 将前端修改后的数据传给后台
export function postUpdateBook(req, res, next) {
    var FormData = JSON.parse(req.body).FormData;
    var bookId = JSON.parse(req.body).bookId;

    book.findById(bookId)
        .then(book => {
            console.log(book);
            book.bookName = FormData.bookName,
                book.authorName = FormData.authorName,
                book.publishHouse = FormData.publishHouse,
                book.date = FormData.date,
                book.priceNum = FormData.priceNum,
                book.category = FormData.category,
                book.bookCount = FormData.bookCount,
                book.desc = FormData.desc
            return book.save()
        })
        .then(result => {
            res.json({
                code: 0,
                message: '书籍更新成功'
            })
        })
        .catch(err => {
            console.log(err);
        })
}


export function removeBook(req, res, next) {
    let {id} = req.query;
    console.log(id);
    // book.remove({_id: id})
    //     .then((book) => {
    //         res.json({
    //             code: 0,
    //             result: '删除书籍成功'
    //         })
    //     })
    //     .catch(err => {
    //         res.json({
    //             code: 500,
    //             message: '更新书籍失败'
    //         })
    //         console.log(err);
    //         return
    //     })
    book.remove({_id: id}, function (err, docs) {
        if (err) {
            res.json({
                code: 500,
                message: '更新书籍失败'
            })
            console.log(err);
            return
        }
        res.json({
            code: 0,
            result: '删除书籍成功'
        })
    })

}

export function  getBorrowBook(req,res,next) {
    let {bookId} = req.query;

    book.findById(bookId)
        .then((result)=>{
            res.json({
                code: 0,
                result: result
            })
        })
        .catch((err)=>{
            if(err){
                res.json({
                    code: 500,
                    message: '获取借书信息失败'
                })
                console.log(err);
                return
            }
        })
}