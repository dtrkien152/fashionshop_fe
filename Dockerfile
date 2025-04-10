# Bước 1: Sử dụng Node.js làm base image
FROM node:18-alpine AS build

# Bước 2: Đặt thư mục làm việc trong container
WORKDIR /usr/src/app

# Bước 3: Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Bước 4: Cài đặt dependencies
RUN npm install --legacy-peer-deps

# Bước 5: Sao chép tất cả mã nguồn vào container
COPY . .

# Bước 6: Build ứng dụng với chế độ production
RUN npm run build -- --mode prod

# Bước 7: Sử dụng một image nhẹ để chạy ứng dụng
FROM node:18-alpine

# Bước 8: Đặt thư mục làm việc
WORKDIR /usr/src/app

# Bước 9: Cài đặt serve để chạy ứng dụng từ thư mục build
RUN npm install -g serve

# Bước 10: Sao chép kết quả build từ bước trước vào thư mục container
COPY --from=build /usr/src/app/dist /usr/src/app/dist

# Bước 11: Mở cổng 3000 để chạy ứng dụng
EXPOSE 3000

# Bước 12: Chạy ứng dụng với serve
CMD ["serve", "-s", "dist", "-l", "3000"]
