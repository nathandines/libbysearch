import { render, fireEvent } from '@testing-library/react';
import { Tabs, TabPanel } from './Tabs';
import { useState } from 'react';

describe('Tabs', () => {

  test('renders with correct number of tabs and the first tab selected by default (uncontrolled)', () => {
    const { getByText } = render(
      <Tabs>
        <TabPanel title="Tab 1">Content 1</TabPanel>
        <TabPanel title="Tab 2">Content 2</TabPanel>
        <TabPanel title="Tab 3">Content 3</TabPanel>
      </Tabs>
    );

    const tab1 = getByText('Tab 1').closest('button');
    const tab2 = getByText('Tab 2').closest('button');
    const tab3 = getByText('Tab 3').closest('button');
    const panel1 = getByText('Content 1');

    expect(tab1).toBeInTheDocument();
    expect(tab2).toBeInTheDocument();
    expect(tab3).toBeInTheDocument();
    if (tab1) expect(tab1.getAttribute('aria-current')).toBe('true');
    if (tab2) expect(tab2.getAttribute('aria-current')).toBe('false');
    if (tab3) expect(tab3.getAttribute('aria-current')).toBe('false');
    expect(panel1).toHaveClass('tab-panel-active');
  });

  test('changes active tab and displays corresponding panel on tab click (uncontrolled)', () => {
    const { getByText } = render(
      <Tabs>
        <TabPanel title="Tab 1">Content 1</TabPanel>
        <TabPanel title="Tab 2">Content 2</TabPanel>
        <TabPanel title="Tab 3">Content 3</TabPanel>
      </Tabs>
    );

    const tab1 = getByText('Tab 1').closest('button');
    const tab2 = getByText('Tab 2').closest('button');
    const tab3 = getByText('Tab 3').closest('button');
    const panel1 = getByText('Content 1');
    const panel2 = getByText('Content 2');
    const panel3 = getByText('Content 3');

    if (tab2) fireEvent.click(tab2);

    // After clicking tab2, tab2 and panel2 should be active
    if (tab1) expect(tab1.getAttribute('aria-current')).toBe('false');
    if (tab2) expect(tab2.getAttribute('aria-current')).toBe('true');
    if (tab3) expect(tab3.getAttribute('aria-current')).toBe('false');
    expect(panel1).not.toHaveClass('tab-panel-active');
    expect(panel2).toHaveClass('tab-panel-active');
    expect(panel3).not.toHaveClass('tab-panel-active');
  });

  test('controlled: renders with specific tabIndex and responds to setTabIndex', () => {
    // Simple controlled test wrapper
    function ControlledTabs() {
      const [tabIndex, setTabIndex] = useState(2);
      return (
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex}>
          <TabPanel title="Tab 1">Content 1</TabPanel>
          <TabPanel title="Tab 2">Content 2</TabPanel>
          <TabPanel title="Tab 3">Content 3</TabPanel>
        </Tabs>
      );
    }
    const { getByText } = render(<ControlledTabs />);
    const tab3 = getByText('Tab 3').closest('button');
    const panel3 = getByText('Content 3');
    if (tab3) fireEvent.click(tab3);
    expect(tab3).toBeInTheDocument();
    expect(tab3 && tab3.getAttribute('aria-current')).toBe('true');
    expect(panel3).toHaveClass('tab-panel-active');
  });

});
