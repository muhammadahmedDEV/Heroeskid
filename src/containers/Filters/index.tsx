// MAIN MODULES
import React from "react";
import { connect } from "react-redux";
// COMPONENTS
import Button from "../../components/Buttons";
import Chips from "../../components/Chips";
import Modal from "../../components/Modal";
import AdvancedFilter from "../AdvancedFilter";
import SearchBar from '../../containers/SearchPageBar/SearchPageBar'

// STYLES
import "./styles.scss";
import { getButtonBlue } from "../../components/Buttons/style";

// ICON
import whileIcon from "../../assets/icons/while.png";
// TYPES

import { State } from "../../reducers/index";
import { AppState } from "../../reducers/app";

// ACTIONS
import { deleteCurrent, openFilterBar } from "../../actions";
import { Col, Row } from "antd";

interface ComponentProps extends AppState {
  isFilterBarOpen: boolean;
  deleteCurrent: any;
  openFilterBar: any;
}

const bc: string = "filter";

const Filter = ({
  filterList,
  isFilterBarOpen,
  deleteCurrent,
  openFilterBar,
}: ComponentProps) => {
  const classes = getButtonBlue("48px", "246px");
  const deleteFilter = (text: string): void => {
    deleteCurrent(text);
  };
  const triggerModal = (): void => {
    openFilterBar("search");
  };
  return (
    <div className={bc}>
      <Row gutter={16}>
        <Col span={24}>
         <SearchBar/>
        </Col>
      </Row>
      <Modal>
        {isFilterBarOpen && <AdvancedFilter onChange={triggerModal} />}
      </Modal>
      <div className={`${bc}__filter-button`}>
      <Button
        title={"Search Filters"}
        variant="outlined"
        icon={whileIcon}
        styles={classes.root}
        onClick={triggerModal}
      />
      </div>
      <Row gutter={16}>
        <Col span={24}>
        <div className={`${bc}__filter-options`}>
        {filterList.length ? (
          filterList.map(({ type, option }: any) => {
            return (
              <Chips
                key={type}
                filterName={type ? type : option}
                onClick={deleteFilter}
              />
            );
          })
        ) : (
          <div className={`${bc}__filter-options__text`}>
            {/* Search Filters */}
            </div>
        )}
      </div>

        </Col>
      </Row>
    </div>
  );
};
const mapStateToProps = (state: State) => state.app;
const mapDispatchToProps = { openFilterBar, deleteCurrent };
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
