## Cấu trúc thư mục

```
Bước 1: Tải folder về máy
Bước 2: chạy lệnh npm install để tải tất cả packages cần thiết vào folder
Bước 3: chạy lệnh node start để chạy dự án
```

```
|--- node_modules/
|--- src/
│   |--- config/
│   |--- controllers/
│   |--- middlewares/
│   |--- models/
    |--- public/
        |--- css/
        |--- images/
        |--- js/
│   |--- routes/
│   |--- services/
│   |--- utils/
|--- .env
|--- nodemon.json
|--- app.js
|--- package.json
|--- package-lock.json
|--- README.md
```

## Mô tả chi tiết

### 📁 Thư mục chính

- **node_modules/**: Chứa tất cả các package dependencies đã cài đặt
- **src/**: Thư mục chứa toàn bộ source code

### 📁 Thư mục src

- **config/**: Cấu hình database, environment variables, và các cài đặt khác
- **controllers/**: Xử lý logic nghiệp vụ, nhận request và trả về response
- **middlewares/**: Các hàm trung gian xử lý authentication, validation, logging...
- **models/**: Định nghĩa schema và tương tác với database
- **routes/**: Định nghĩa các endpoint API và routing
- **services/**: Chứa logic, xử lý dữ liệu phức tạp
- **utils/**: Các hàm tiện ích, helper functions

### 📄 File chính

- **app.js**: File khởi chạy server, cấu hình Express và middleware
- **.env**: Chứa các biến môi trường (database URL, port, secret keys...)
- **package.json**: Khai báo dependencies, scripts, thông tin project
