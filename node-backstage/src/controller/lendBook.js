import {book} from '../models'
import {lendBook} from '../models'

export function postBorrowBook(req, res, next) {
    // 根据书籍的id 在book数据库中 将其数量减去1
    // 在借书数据库中 将数量加一
    var FormData = JSON.parse(req.body).FormData;
    var bookId = JSON.parse(req.body).bookId;
    // console.log(JSON.stringify(FormData));
    book.findById(bookId)
        .then((book) => {
            book.bookCount = book.bookCount - 1;
            return book.save()
        })
        .then(result => {
            const newlendBook = new lendBook({
                bookName: FormData.bookName,
                userName: FormData.userName,
                lendDate: FormData.startTime,
                ShouldReturnDate: FormData.cutoffTime,
                bookPrice: FormData.priceNum,
                reNewTimes: FormData.renew
            })
            return newlendBook.save()
        })
        .then((docs) => {
            res.json({
                code: 0,
                message: '借书成功'
            })
        })
        .catch((err) => {
            res.json({
                code: 500,
                message: '借书失败'
            })
            console.log(err);
        })
}

export function getlendBackList(req, res, next) {
    // 在这里 读取数据  然后进行分页
    let {page, pageSize, user} = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
    var totalCount = 0;

    lendBook.find({userName: user})
        .exec((err, docs) => {
            if (err) {
                res.json({
                    code: 500,
                    message: '查询借书列表失败'
                })
                console.log(err);
                return;
            }
            totalCount = docs.length;
            if (docs.length === 0) {
                res.json({
                    code: 0,
                    result: [],
                    totalCount: 0
                })
                return;
            }
            lendBook.find({userName: user})
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec((err, lendBookArr) => {
                    if (err) {
                        res.json({
                            code: 501,
                            message: '查询借书列表失败'
                        })
                        console.log(err);
                        return;
                    }
                    res.json({
                        code: 0,
                        result: lendBookArr,
                        totalCount: totalCount
                    })

                })
        })
}

export function getManagerlendBackList(req, res, next) {
    // 在这里 读取数据  然后进行分页
    let {page, pageSize} = req.query;
    page = Number.parseInt(page);
    pageSize = Number.parseInt(pageSize);
    var totalCount = 0;

    lendBook.find()
        .exec((err, docs) => {
            if (err) {
                res.json({
                    code: 500,
                    message: '查询借书列表失败'
                })
                console.log(err);
                return;
            }
            totalCount = docs.length;
            if (docs.length === 0) {
                res.json({
                    code: 0,
                    result: [],
                    totalCount: 0
                })
                return;
            }
            lendBook.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec((err, lendBookArr) => {
                    if (err) {
                        res.json({
                            code: 501,
                            message: '查询借书列表失败'
                        })
                        console.log(err);
                        return;
                    }
                    res.json({
                        code: 0,
                        result: lendBookArr,
                        totalCount: totalCount
                    })

                })
        })
}

// 用户归还书籍
export function returnLendBook(req, res, next) {
    let {id, bookName} = req.query;
    //  从lendBook数据库中 删除这条数据
    //  从book数据库中  按照书籍名称 将他的 bookCount增加1
    // console.log(id);
    // console.log(bookName);
    // lendBook.remove({_id:id},function (err,docs) {
    //     if(err){
    //         res.json({
    //             code: 500,
    //             message: '还书失败'
    //         })
    //         console.log(err);
    //         return
    //     }
    //     book.find({bookName: bookName},(err,docs)=>{
    //         if(err){
    //             res.json({
    //                 code: 500,
    //                 message: '还书失败'
    //             })
    //             console.log(err);
    //             return
    //         }
    //         docs.bookCount = docs.bookCount + 1;
    //
    //     })
    // })
    lendBook.remove({_id: id})
        .then((docs) => {
            book.find({bookName: bookName})
                .then((book) => {
                    // console.log(book);
                    // console.log(book[0]);
                    book[0].bookCount = book[0].bookCount + 1;
                    return book[0].save()
                })
                .then((doc) => {
                    res.json({
                        code: 0,
                        message: '还书成功'
                    })
                })
                .catch((err) => {
                    if (err) {
                        res.json({
                            code: 500,
                            message: '还书失败'
                        })
                        console.log(err);
                        return
                    }
                })
        })
        .catch((err) => {
            if (err) {
                res.json({
                    code: 500,
                    message: '还书失败'
                })
                console.log(err);
                return
            }
        })
}