import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import clsx from "clsx";

import { SmallLeftArrowIcon, SmallRightArrowIcon } from "icons";
import { Button } from "components";

import style from "./style.module.scss";

export interface PaginationProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
    "onChange"
  > {
  showPrevNextButton?: boolean;
  showFirstLastPage?: boolean;
  maxButtonVisible?: number;
  page: number;
  pageAmount: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  classes?: {
    root?: string;
    button?: string;
    activePage?: string;
    skip?: string;
  };
}

interface SkipProps {
  className?: string;
}

const Skip: FC<SkipProps> = ({ className }) => (
  <span className={clsx(style.skip, className)}>...</span>
);

export const StandardPagination: FC<PaginationProps> = ({
  maxButtonVisible = 3,
  showPrevNextButton,
  showFirstLastPage,
  page,
  pageAmount,
  classes,
  onChange,
  disabled,
}) => {
  const Pages: FC = () => {
    const components: JSX.Element[] = [];
    const firstPage = 1;
    const buttonsRange = Math.floor(maxButtonVisible / 2);

    const firstShowButtonNumber = Math.max(page - buttonsRange, firstPage);
    const lastShowButtonNumber = Math.min(page + buttonsRange, pageAmount);

    for (
      let pageNumber = firstShowButtonNumber;
      pageNumber <= lastShowButtonNumber;
      pageNumber++
    ) {
      const changePageToNumber = () => onChange && onChange(pageNumber);

      const isActive = pageNumber === page;

      const Component = (
        <Button
          onClick={changePageToNumber}
          disabled={isActive || disabled}
          className={clsx(
            classes?.button,
            style.button,
            isActive && [style.active, classes?.activePage]
          )}
          key={pageNumber}
        >
          {pageNumber}
        </Button>
      );

      const isLast = pageNumber === pageAmount;
      const isFirst = pageNumber === firstPage;

      if (!((isFirst || isLast) && showFirstLastPage)) {
        components.push(Component);

        if (
          pageNumber === lastShowButtonNumber &&
          lastShowButtonNumber + 1 < pageAmount
        ) {
          components.push(<Skip className={classes?.skip} />);
        } else if (
          pageNumber === firstShowButtonNumber &&
          firstShowButtonNumber - 1 > firstPage
        ) {
          components.splice(
            components.length - 2,
            0,
            <Skip className={classes?.skip} />
          );
        }
      }
    }

    return <>{components.map((data) => (
      <React.Fragment key={data.key}>
        {data}
      </React.Fragment>
    ))}</>;
  };

  const setFirstPage = () => onChange && onChange(1);
  const setLastPage = () => onChange && onChange(pageAmount);
  const setPrevPage = () => onChange && onChange(Math.max(1, page - 1));
  const setNextPage = () =>
    onChange && onChange(Math.min(pageAmount, page + 1));

  const disabledBecauseFirstPage = page === 1 || disabled;
  const disabledBecauseLastPage = page === pageAmount || disabled;

  return (
    <div className={clsx(style.root, classes?.root)}>
      {showPrevNextButton && (
        <Button
          onClick={setPrevPage}
          disabled={disabledBecauseFirstPage}
          className={clsx(classes?.button, style.button)}
        >
          <SmallLeftArrowIcon />
        </Button>
      )}

      {showFirstLastPage && (
        <Button
          onClick={setFirstPage}
          disabled={disabledBecauseFirstPage}
          className={clsx(
            classes?.button,
            style.button,
            page === 1 && [style.active, classes?.activePage]
          )}
        >
          1
        </Button>
      )}

      {<Pages />}

      {showFirstLastPage && pageAmount !== 1 && (
        <Button
          onClick={setLastPage}
          disabled={disabledBecauseLastPage}
          className={clsx(classes?.button, style.button, page === pageAmount && [style.active, classes?.activePage])}
        >
          {pageAmount}
        </Button>
      )}

      {showPrevNextButton && (
        <Button
          onClick={setNextPage}
          disabled={disabledBecauseLastPage}
          className={clsx(classes?.button, style.button)}
        >
          <SmallRightArrowIcon />
        </Button>
      )}
    </div>
  );
};
