import React, { useState, useId} from "react";
import { CounterPill } from "./CounterPill";
import "./Tabs.scss";

interface TabsProps {
  children: React.ReactElement<TabPanelProps>[];
  tabIndex?: number;
  setTabIndex?: (n: number) => void;
}

function Tabs(props: TabsProps) {
  // Setup for controlled/uncontrolled mode:
  const isControlled = typeof props.tabIndex === 'number' && props.setTabIndex;
  const [internalTabIndex, setInternalTabIndex] = useState(0);
  const tabIndex = isControlled ? props.tabIndex! : internalTabIndex;
  const setTabIndex = isControlled ? props.setTabIndex! : setInternalTabIndex;

  const tabsID = useId();

  return (
    <div className="tabs">
      <div className="tablist">
        {props.children.map((child: React.ReactElement, index: number) => {
          const { title, counter } = child.props;
          const selected = tabIndex === index;
          return (
            <button
              id={tabsID + index + "-tab"}
              onClick={() => setTabIndex(index)}
              key={title}
              disabled={child.props.disabled}
              aria-current={selected}
              aria-controls={tabsID + index + "-panel"}
              className={'tab ' + (selected ? "tab-active" : "")}
            >
              <span>{title}</span>{typeof counter === 'number' && <CounterPill count={counter}/>} 
            </button>
          );
        })}
      </div>
      {props.children.map((child: React.ReactElement, index: number) => {
        const selected = tabIndex === index;
        return (
          <div
            id={tabsID + index + "-panel"}
            aria-labelledby={tabsID + index + "-tab"}
            className={'tab-panel ' + (selected ? "tab-panel-active" : "")}
            key={child.props.title}
          >
            {child.props.children}
          </div>
        );
      })}
    </div>
  );
}

interface TabPanelProps {
  title: string;
  counter?: number;
  disabled?: boolean;
  children: React.ReactNode | React.ReactFragment
}

function TabPanel( props: TabPanelProps) {
  return (
    <div className="tab-panel">
      {props.children}
    </div>
  )
}

export { Tabs, TabPanel}