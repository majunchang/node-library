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
            lendBook.find()
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec((err, lendBookArr) => {
                    if(err){
                        res.json({
                            code: 500,
                            message: '查询借书列表失败'
                        })
                        console.log(err);
                        return;
                    }
                    res.json({
                        code:0,
                        result:lendBookArr,
                        totalCount:totalCount
                    })

                })
        })
}