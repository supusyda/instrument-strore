import React from "react";
import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="blog-title">
                        <h1>Blog</h1>
                    </div>
                    <div className="blog-list">
                        <Link to="#">
                            <u>1. Hướng dẫn đăng nhập</u>
                        </Link>
                        <Link to="#">
                            <u>2. Hướng dẫn đặt hàng</u>
                        </Link>
                        <Link to="#">
                            <u>3. Hướng dẫn thanh toán</u>
                        </Link>
                        <Link to="#">
                            <u>4. Vì sao nên mua hàng của chúng tôi</u>
                        </Link>
                        <Link to="#">
                            <u>5. Liên lạc với chung tôi như thế nào</u>
                        </Link>
                        <Link to="#">
                            <u>6. Chính sách bán hàng</u>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Blog;