using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTO;
using DinkToPdf;
using DinkToPdf.Contracts;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConverter _pdfConverter;

        public QuoteController(AppDbContext context, IConverter pdfConverter)
        {
            _context = context;
            _pdfConverter = pdfConverter;
        }

        // api render pdf cho bảng Capsules
        [HttpGet("pdf")]
        public IActionResult GeneratePdf()
        {
            // 1. Lấy dữ liệu từ bảng Capsules
            var capsuleList = _context.Capsules
                .Select(c => new CapsuleQuotationDto
                {
                    Name = c.Name,
                    Avatar = c.Avatar,
                    Price = c.Price
                })
                .ToList();

            // 2. Tạo HTML để render vào PDF
            var html = new StringBuilder();
            html.Append($@"
                <!DOCTYPE html>
                <html lang='vi'>
                <head>
                    <meta charset='UTF-8'>
                    <style>
                        body {{
                            font-family: 'Segoe UI', sans-serif;
                            margin: 40px;
                        }}
                        .header {{
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }}
                        .company-info {{
                            font-size: 14px;
                            color: #333;
                        }}
                        .logo img {{
                            width: 150px;
                        }}
                        h2 {{
                            text-align: center;
                            color: #2E86C1;
                            margin-top: 20px;
                        }}
                        table {{
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                        }}
                        th {{
                            background-color: #3498DB;
                            color: white;
                            padding: 10px;
                            text-align: center;
                        }}
                        td {{
                            border: 1px solid #ddd;
                            padding: 10px;
                            text-align: center;
                            vertical-align: middle;
                        }}
                        img {{
                            width: 80px;
                            height: auto;
                        }}
                        .footer {{
                            margin-top: 50px;
                            font-size: 14px;
                            text-align: right;
                        }}
                        .signature {{
                            margin-top: 60px;
                            text-align: right;
                            font-style: italic;
                        }}
                    </style>
                </head>
                <body>
                    <div class='header'>
                        <div class='company-info'>
                            <strong>ABC COMPANY</strong><br/>
                            Address: Hoa Lac, Thach That, Hanoi<br/>
                            Phone: 0909 123 456<br/>
                            Email: contact@abc.com
                        </div>
                    </div>

                    <h2>CAPSULE PRODUCT PRICE LIST</h2>

                    <table>
                        <tr>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Price</th>
                        </tr>");

                            foreach (var item in capsuleList)
                            {
                                var imagePhysicalPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", item.Avatar.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
                                var imageSrc = $"file:///{imagePhysicalPath.Replace("\\", "/")}";

                                html.Append($@"
                        <tr>
                            <td>{item.Name}</td>
                            <td><img src='{imageSrc}' /></td>
                            <td>{item.Price:N0} USD</td>
                        </tr>");
                            }

                            html.Append($@"
                    </table>

                    <div class='footer'>
                        Quotation Date: {DateTime.Now:dd/MM/yyyy}
                    </div>

                    <div class='signature'>
                        Director of ABC Pharmaceutical Company<br/><br/><br/>
                        <strong>Ngo Manh Tien</strong>
                    </div>
                </body>
                </html>");


            // 3. Tạo file PDF bằng DinkToPdf
            var pdfDoc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                    DocumentTitle = "Capsule Product Quotation"
                },
                Objects = {
                    new ObjectSettings
                    {
                        HtmlContent = html.ToString(),
                        WebSettings = { DefaultEncoding = "utf-8", LoadImages = true, UserStyleSheet = null},
                        UseExternalLinks = true
                    }
                }
            };

            var pdf = _pdfConverter.Convert(pdfDoc);

            // 4. Trả file về cho frontend
            return File(pdf, "application/pdf", "bao-gia-vien-nang.pdf");
        }





        // api render pdf cho bảng liquidF
        [HttpGet("liquid")]
        public IActionResult GenerateLiquidPdf()
        {
            // 1. Lấy dữ liệu từ bảng LiquidFilling
            var liquidList = _context.LiquidFillings
                .Select(l => new LiquidQuotationDto
                {
                    ModelName = l.ModelName,
                    Avatar = l.Avatar,
                    Price = l.Price
                })
                .ToList();

            // 2. Tạo HTML để render vào PDF
            var html = new StringBuilder();
            html.Append($@"
        <!DOCTYPE html>
        <html lang='vi'>
        <head>
            <meta charset='UTF-8'>
            <style>
                body {{
                    font-family: 'Segoe UI', sans-serif;
                    margin: 40px;
                }}
                .header {{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }}
                .company-info {{
                    font-size: 14px;
                    color: #333;
                }}
                .logo img {{
                    width: 150px;
                }}
                h2 {{
                    text-align: center;
                    color: #2E86C1;
                    margin-top: 20px;
                }}
                table {{
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }}
                th {{
                    background-color: #3498DB;
                    color: white;
                    padding: 10px;
                    text-align: center;
                }}
                td {{
                    border: 1px solid #ddd;
                    padding: 10px;
                    text-align: center;
                    vertical-align: middle;
                }}
                img {{
                    width: 80px;
                    height: auto;
                }}
                .footer {{
                    margin-top: 50px;
                    font-size: 14px;
                    text-align: right;
                }}
                .signature {{
                    margin-top: 60px;
                    text-align: right;
                    font-style: italic;
                }}
            </style>
        </head>
        <body>
            <div class='header'>
                <div class='company-info'>
                    <strong>ABC COMPANY</strong><br/>
                    Address: Hoa Lac, Thach That, Hanoi<br/>
                    Phone: 0909 123 456<br/>
                    Email: contact@abc.com
                </div>
            </div>

            <h2>LIQUID FILLING MACHINE QUOTATION</h2>

            <table>
                <tr>
                    <th>Model Name</th>
                    <th>Image</th>
                    <th>Price</th>
                </tr>");

            foreach (var item in liquidList)
            {
                var imagePhysicalPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", item.Avatar.TrimStart('/').Replace('/', Path.DirectorySeparatorChar));
                var imageSrc = $"file:///{imagePhysicalPath.Replace("\\", "/")}";

                html.Append($@"
                <tr>
                    <td>{item.ModelName}</td>
                    <td><img src='{imageSrc}' /></td>
                    <td>{item.Price:N0} USD</td>
                </tr>");
            }

            html.Append($@"
            </table>

            <div class='footer'>
                Quotation Date: {DateTime.Now:dd/MM/yyyy}
            </div>

            <div class='signature'>
                Director of ABC Pharmaceutical Company<br/><br/><br/>
                <strong>Ngo Manh Tien</strong>
            </div>
        </body>
        </html>");

            // 3. Tạo file PDF
            var pdfDoc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                    DocumentTitle = "Liquid Filling Machine Quotation"
                },
                Objects = {
            new ObjectSettings
            {
                HtmlContent = html.ToString(),
                WebSettings = { DefaultEncoding = "utf-8", LoadImages = true }
            }
        }
            };

            var pdf = _pdfConverter.Convert(pdfDoc);

            // 4. Trả file về frontend
            return File(pdf, "application/pdf", "bao-gia-may-chiet-dich.pdf");
        }



        // api render pdf cho bảng tablet
        [HttpGet("tablet")]
        public IActionResult GenerateTabletPdf()
        {
            // 1. Lấy dữ liệu từ bảng Tablet
            var tabletList = _context.Tablets
                .Select(t => new TabletQuotationDto
                {
                    ModelNumber = t.ModelNumber,
                    Avatar = t.Avatar,
                    Price = t.Price
                })
                .ToList();

            // 2. Tạo HTML
            var html = new StringBuilder();
            html.Append($@"
            <!DOCTYPE html>
            <html lang='vi'>
            <head>
                <meta charset='UTF-8'>
                <style>
                    body {{
                        font-family: 'Segoe UI', sans-serif;
                        margin: 40px;
                    }}
                    .header {{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }}
                    .company-info {{
                        font-size: 14px;
                        color: #333;
                    }}
                    .logo img {{
                        width: 150px;
                    }}
                    h2 {{
                        text-align: center;
                        color: #2E86C1;
                        margin-top: 20px;
                    }}
                    table {{
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }}
                    th {{
                        background-color: #3498DB;
                        color: white;
                        padding: 10px;
                        text-align: center;
                    }}
                    td {{
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: center;
                        vertical-align: middle;
                    }}
                    img {{
                        width: 80px;
                        height: auto;
                    }}
                    .footer {{
                        margin-top: 50px;
                        font-size: 14px;
                        text-align: right;
                    }}
                    .signature {{
                        margin-top: 60px;
                        text-align: right;
                        font-style: italic;
                    }}
                </style>
            </head>
            <body>
                <div class='header'>
                    <div class='company-info'>
                        <strong>ABC COMPANY</strong><br/>
                        Address: Hoa Lac, Thach That, Hanoi <br/>
                        Phone: 0909 123 456<br/>
                        Email: contact@abc.com
                    </div>
                </div>

                <h2>TABLET PRESS MACHINE QUOTATION</h2>

                <table>
                    <tr>
                        <th>Model Name</th>
                        <th>Image</th>
                        <th>Price</th>
                    </tr>");

                        foreach (var item in tabletList)
                        {
                            var imagePhysicalPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", item.Avatar?.TrimStart('/')?.Replace('/', Path.DirectorySeparatorChar) ?? "");
                            var imageSrc = $"file:///{imagePhysicalPath.Replace("\\", "/")}";

                            html.Append($@"
                    <tr>
                        <td>{item.ModelNumber}</td>
                        <td><img src='{imageSrc}' /></td>
                        <td>{item.Price:N0} USD</td>
                    </tr>");
                        }

                        html.Append($@"
                </table>

                <div class='footer'>
                    Quotation Date: {DateTime.Now:dd/MM/yyyy}
                </div>

                <div class='signature'>
                    Director of ABC Pharmaceutical Company<br/><br/><br/>
                    <strong>Ngo Manh Tien</strong>
                </div>
            </body>
            </html>");

            // 3. Tạo PDF
            var pdfDoc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                    DocumentTitle = "Tablet Press Machine Quotation"
                },
                Objects = {
            new ObjectSettings
            {
                HtmlContent = html.ToString(),
                WebSettings = { DefaultEncoding = "utf-8", LoadImages = true }
            }
        }
            };

            var pdf = _pdfConverter.Convert(pdfDoc);

            // 4. Trả về file PDF
            return File(pdf, "application/pdf", "bao-gia-may-dap-vien.pdf");
        }



    }
}
