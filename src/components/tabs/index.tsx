import React, {
  FC,
  Children,
  MouseEvent,
  createContext,
  useState,
  useRef,
  ReactElement,
  useEffect,
  cloneElement,
  isValidElement
} from "react";
import clsx from "clsx";

import styles from "./style.module.scss";
import Highlighter from "./components/Highlighter";
import { useWindowSize } from "hooks";

export interface Props {
  children: ReactElement[];
  highlighterClass?: string;
  className?: string;
  value: string | number;
  onChange: (event: MouseEvent<MouseEvent>, value: Props["value"]) => void;
}

export interface DefaultTabContext {
  tabOnChange: Props["onChange"];
  value: Props["value"];
}

export const TabContext = createContext<DefaultTabContext>({
  tabOnChange: () => {},
  value: "",
});

export const Tabs: FC<Props> = ({
  children,
  highlighterClass,
  value,
  onChange,
  className,
}) => {
  const [selectedTabPosition, setSelectedTabPosition] = useState({
    offset: 0,
    width: 0,
  });
  const tabRefs = useRef<Record<Props["value"], HTMLButtonElement>>({});
  const { width } = useWindowSize();

  useEffect(() => {
    if (tabRefs.current[value]) {
      setSelectedTabPosition({
        offset: tabRefs.current[value].offsetLeft,
        width: tabRefs.current[value].clientWidth,
      });
    }
  }, [value, width]);

  return (
    <div className={clsx(styles.root, className)}>
      <TabContext.Provider
        value={{
          tabOnChange: onChange,
          value: value,
        }}>
        {Children.map(children, (child, index) => {
          if (isValidElement(child)) {
            const propsValue = child.props.value
            const value = propsValue ? propsValue : index;
            return cloneElement(child, {
              ...child.props,
              value,
              ref: (ref: HTMLButtonElement | null) => {
                if (ref && tabRefs.current[value] !== ref) {
                  tabRefs.current[value] = ref;
                }
              },
            });
          }
        })}
      </TabContext.Provider>
      <Highlighter
        style={{
          width: selectedTabPosition.width,
          transform: `translateX(${selectedTabPosition.offset}px)`,
        }}
        className={highlighterClass}
      />
    </div>
  );
};

export default Tabs;
