import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  title: string;
  currentPage: string;
  homePath?: string;
}

export const BreadcrumbComponent: React.FC<BreadcrumbProps> = ({ title, currentPage, homePath = "/" }) => {
  return (
    <section className="section-breadcrumb">
      <div className="cr-breadcrumb-image">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cr-breadcrumb-title">
                <h2>{title}</h2>
                <span>
                  <Link to={homePath}>Trang chủ</Link> - {currentPage}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

