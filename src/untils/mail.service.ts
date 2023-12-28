import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.TYPE_MAIL,
      auth: {
        user: process.env.NAME_MAIL,
        pass: process.env.PASSWORD_MAIL,
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: `Suongg Store<${process.env.NAME_MAIL}>`,
      to,
      subject,
      html,
    };

    return await this.transporter.sendMail(mailOptions);
  }
  templateRegister(data: any): string {
    return ` <html>
    <head>
    <style>
    /* CSS styles */
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 960px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    }
    .infoTwitter {
      display: flex;
      align-items: center;
      color: #1da1f2;
      margin-bottom: 20px;
    }
    .infoTwitter img {
      width: 80px;
      height: auto;
      object-fit: cover;
    }
    .infoTwitter h3 {
      font-size: 24px;
      margin: 0;
    }
    h1 {
      color: #333333;
      margin: 0;
    }
    .content {
      color: #555555;
      font-size: 18px;
    }
  </style>
    </head>
    <body>
    <h1>Chúc mừng ${data} đã đăng ký thành công!</h1>
    <p class="content">Hãy khám phá chúng tôi và trải nghiệm những điều thú vị.</p>
  </div>
    </body>
  </html>`;
  }
  templateOrder(data: any): string {
    return `<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xác nhận đơn hàng</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                margin-top: 20px;
            }
    
            h1 {
                color: #333333;
            }
    
            p {
                color: #555555;
            }
    
            .order-details {
                border-collapse: collapse;
                width: 100%;
                margin-top: 20px;
            }
    
            .order-details th, .order-details td {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }
    
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                text-align: center;
                text-decoration: none;
                background-color: #3498db;
                color: #ffffff;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Đơn hàng của bạn đã được xác nhận</h1>
            <p>Cảm ơn bạn đã đặt hàng tại cửa hàng chúng tôi. Đơn hàng của bạn đã được xác nhận thành công.</p>
    
            <h2>Chi tiết đơn hàng</h2>
            <table class="order-details">
                <tr>
                    <th>Sản phẩm</th>
                    <th>Hình ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                </tr>
                ${data
                  .map(
                    (item) => `
                <tr>
                    <td>${item.product.product_name}</td>
                    <td><img src="${item.product.product_img}" alt="${
                      item.productName
                    }" style="width: 50px;"></td>
                    <td>${item.quantity}</td>
                    <td>${item.product.product_price.toLocaleString()} đ</td>
                </tr>
            `,
                  )
                  .join('')}
                
            </table>
            <p>Tổng cộng:${data
              .reduce(
                (sum, item) => sum + item.product.product_price * item.quantity,
                0,
              )
              .toLocaleString()} đ</p>
    
            <p>Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Chúng tôi sẽ thông báo cho bạn khi đơn hàng của bạn đã được gửi đi.</p>
    
            <a href="http://localhost:8080/user/history" class="button">Theo dõi đơn hàng của bạn</a>
        </div>
    </body>
    </html>`;
  }
}
