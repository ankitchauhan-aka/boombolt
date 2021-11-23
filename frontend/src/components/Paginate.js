import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '', pageType = '' }) => {
  return (
    pages > 1 && (
      <>
      <Pagination>
        
          <LinkContainer
            key={1}
            to={
              !isAdmin
                // ? keyword || keyword == ' '
                  ? `/${pageType ? 'category' : 'allProducts'}/${keyword || 'all'}/page/1`
                  // : `/page/${x + 1}`
                : `/admin/productlist/1`
            }
          >
            <Pagination.Item active={1 === page}>First</Pagination.Item>
          </LinkContainer>
          {page !== 1 && 1 !== page-1 && <LinkContainer
            key={page-1}
            to={
              !isAdmin
                // ? keyword || keyword == ' '
                  ? `/${pageType ? 'category' : 'allProducts'}/${keyword || 'all'}/page/${page - 1}`
                  // : `/page/${x + 1}`
                : `/admin/productlist/${page - 1}`
            }
          >
            <Pagination.Item active={page - 1 === page}>Previous</Pagination.Item>
          </LinkContainer>}

          {page != 1 && page !== pages && <LinkContainer to="">
                <Pagination.Item active="false">{page}</Pagination.Item>
              </LinkContainer>}
          {page !== pages && page+1 != pages &&
          <LinkContainer
            key={page + 1}
            to={
              !isAdmin
                // ? keyword || keyword == ' '
                  ? `/${pageType ? 'category' : 'allProducts'}/${keyword || 'all'}/page/${page + 1}`
                  // : `/page/${x + 1}`
                : `/admin/productlist/${page + 1}`
            }
          >
            <Pagination.Item active={page + 1 === page}>Next</Pagination.Item>
          </LinkContainer>}
          <LinkContainer
            key={pages}
            to={
              !isAdmin
                // ? keyword || keyword == ' '
                  ? `/${pageType ? 'category' : 'allProducts'}/${keyword || 'all'}/page/${pages}`
                  // : `/page/${x + 1}`
                : `/admin/productlist/${pages}`
            }
          >
            <Pagination.Item active={pages === page}>Last ({pages})</Pagination.Item>
          </LinkContainer>
          
      </Pagination>
      
      </>
    )
  )
}

export default Paginate
