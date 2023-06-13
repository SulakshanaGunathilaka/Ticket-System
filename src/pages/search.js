
const filterByName = (name, dataSet) => {
  let filtered = dataSet;
  if (name !== "") {
    filtered = dataSet.filter((item) => {
      let fullName = item.firstName + item.middleName + item.lastName;
      let firstLastName = item.firstName + item.lastName;

      let searchableString = `${fullName} ${firstLastName} ${item.firstName} ${item.lastName} ${item.email} ${item.primaryMobile} ${item.id}${item.workFlowStatus} ${item.postalCode.code}${item.postalCode.regionName}`;
      let p = searchableString;

      return p.toLowerCase().includes(name.toLowerCase());
    });
  }
  let lengthofSearch = filtered.length;
  return { filtered, lengthofSearch };
};

const Candidates = (props) => {
  const { specialities, roles } = props;
  const MexxarApi = REGISTER_CANDIDATE;
  const { addToast } = useToasts();

  const [filterCustom, setFilterCustom] = useState({
    value: "ACTIVE",
    bool: true,
  });

  //change the url
  // let url = MexxarApi + "/status/" + filterCustom.value;
  const [speciality, setSpeciality] = useState([]);
  const [role, setRole] = useState([]);
  const [band, setBand] = useState([]);
  const [selectedSpecialities, setSelectedSpecialities] = useState({
    id: 0,
    value: "",
    label: "",
  });
  const [selectedRole, setSelectedRole] = useState({
    id: 0,
    value: "",
    label: "",
  });
  const [selectedBand, setSelectedBand] = useState({
    id: 0,
    value: "",
    label: "",
  });

  let url =
    MexxarApi +
    "/filter-speciality-role-band/status?status=" +
    filterCustom.value +
    "&speciality=" +
    selectedSpecialities.id +
    "&role=" +
    selectedRole.id +
    "&band=" +
    selectedBand.id;

  const [resetResults, setResetResults] = useState(false);
  const [searchStatus, setSearchStatus] = useState({
    status: false,
    data: null,
  });

  const toggleFilter = () => setIsOpenFilter(!isOpenFilter);


  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [searchAdvanced, setsearchAdvanced] = useState(false);
  const [showSnapshotModal, setShowSnapshotModal] = useState(false);
  const [selectedItemsForSnapshot, setSelectedItemsForSnapshot] = useState();

 
  const handleSearchOnChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleSnapshotModal = () => {
    // let selectedCandidates = filter(rows, (item) => {
    //   return item.candidateId === "SPECIAL";
    // });
    let tempArray = [];

    if (!selectAll) {
      for (let i = 0; i < rows.length; i++) {
        for (let x = 0; x < selectedItems.length; x++) {
          if (selectedItems[x] == rows[i].id) {
            tempArray.push(rows[i]);
          }
        }
      }
    } else if (selectAll) {
      for (let i = 0; i < rows.length; i++) {
        tempArray.push(rows[i]);
      }
    }

    setSelectedItemsForSnapshot(tempArray);
    setShowSnapshotModal(!showSnapshotModal);
  };

  const isSelected = (id) => {
    let slectedRows = filter(selectedItems, (item) => {
      return item == id;
    });

    if (slectedRows.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const onItemSelect = (rowId) => {
    let slectedRows = filter(selectedItems, (item) => {
      return item == rowId;
    });

    if (slectedRows.length > 0) {
      let removeItems = filter(selectedItems, (item) => {
        return item != rowId;
      });
      setSelectedItems([...removeItems]);
      setSelectAll(false);
      return false;
    } else {
      setSelectedItems([...selectedItems, rowId]);
      return true;
    }
  };

  const checkAll = () => {
    let ids = [];
    if (selectAll) {
      setSelectAll(false);
      setSelectedItems([]);
    } else {
      rows.forEach((item) => {
        ids.push(item.id);
      });
      setSelectedItems(ids);
      setSelectAll(true);
    }
  };

  const handleCheck = (e) => {
    if (e.target.checked) {
      let data = e.target.value;

      switch (data) {
        case "ACTIVE":
          setFilterCustom({ value: data, bool: true });
          break;
        case "INACTIVE":
          setFilterCustom({ value: data, bool: true });
          break;

        case "DO_NOT_CALL":
          setFilterCustom({ value: data, bool: true });
          break;
        case "DORMANT":
          setFilterCustom({ value: data, bool: true });
          break;
      }
    } else {
      let data = e.target.value;

      switch (data) {
        case "ACTIVE":
          setFilterCustom({ value: "", bool: false });
          break;
        case "INACTIVE":
          setFilterCustom({ value: "", bool: false });
          break;

        case "DO_NOT_CALL":
          setFilterCustom({ value: "", bool: false });
          break;
        case "DORMANT":
          setFilterCustom({ value: "", bool: false });
          break;
      }
    }
  };

  const handleSearchAdvance = () => {
    let w = selectedSpecialities.length > 0 ? 1 : 0;

    let result_3 = [];

    if (w > 0) {
      forEach(selectedSpecialities, function (item) {
        forEach(rows, function (row) {
          let A = filter(row.candidateSpecialities, (value) => {
            return value.id === item.id;
          });

          if (A.length !== 0) {
            result_3.push(row);
          }
        });
      });

      setSearchStatus({ status: true, data: result_3 });
      // setRows(result_3);
    }
  };

  const reset = () => {
    // setRows(initialRows);
    setSearchStatus({ status: false, data: null });
    setResetResults(!resetResults);
    setSelectedSpecialities({ id: 0, value: "", label: "" });
    setSelectedRole({ id: 0, value: "", label: "" });
    setSelectedBand({ id: 0, value: "", label: "" });
    setFilterCustom({ value: "ACTIVE", bool: true });
    setPageNumber(1)
  };

  const rearrangeSpecialities = () => {
    let specialitiesTemp = [];
    specialities.forEach((item) => {
      specialitiesTemp.push({
        value: item.name,
        label: item.name,
        id: item.id,
      });
    });
    setSpeciality(specialitiesTemp);
  };
  const rearrangeRoles = () => {
    let rolesTemp = [];
    roles.forEach((item) => {
      rolesTemp.push({
        value: item.name,
        label: item.name,
        id: item.id,
      });
    });
    setRole(rolesTemp);
  };
  const rearrangeBands = (data) => {
    let bandsTemp = [];
    data.forEach((item) => {
      bandsTemp.push({
        value: item.name,
        label: item.name,
        id: item.id,
      });
    });
    setBand(bandsTemp);
  };

 
  // useEffect(() => {
  //   getAllRows();
  // }, [filterCustom]);

  const getBands = () => {
    axios.get(HOSTMexxar + "candidate-bands").then((bands) => {
      rearrangeBands(bands.data.body);
    });
  };



  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, rows, hasMore, totalElements } = useCandidateList(
    url,
    filterCustom,
    query,
    pageNumber,
    searchAdvanced,
    resetResults
  );
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  useDidMountEffect(() => {
    setPageNumber(1);
  }, [searchAdvanced]);

  useEffect(() => {
    Store.dispatch(specialitiesGetAction());
    Store.dispatch(rolesGetAction());
    getBands();

    return () => {};
  }, []);

  useEffect(() => {
    if (specialities) {
      rearrangeSpecialities();
    }
    return () => {};
  }, [specialities]);

  useEffect(() => {
    if (roles) {
      rearrangeRoles();
    }
    return () => {};
  }, [roles]);

  
  const shortCutKey = (event) => {
    if (event.key === "Shift + F") {
    }
  };

  
  return (
    <>
      <DashboardLayout title="Candidates" subTitle="Candidate Monitoring">
        <FontAwesomeIcon icon={faUsers} className={"mr-3"} />
        <Label>
          {totalElements}{" "}
          {totalElements.length == 1 ? "Candidate" : "Candidates"}
        </Label>
        <div className="form-inline">
          <Button onClick={toggleFilter} className="btn bg-dark-lt text-dark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-filter mx-2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span className="mx-1">Filter</span>
          </Button>
          <Input
            value={query}
            onChange={handleSearch}
            // onChange={(e) => handleSearchOnChange(e)}
            type="text"
            id="searchbar"
            className="form-control no-border no-shadow no-bg typeahead tt-input"
            placeholder="Search Candidates..."
            autoComplete="off"
            spellCheck="false"
            dir="auto"
            style={{
              position: "relative",
              verticalAlign: "top",
              backgroundColor: "transparent",
            }}
            onKeyDown={(e) => shortCutKey(e)}
          />
        </div>
        <UncontrolledTooltip target="searchbar">
          Search candidates by ID / Email / Phone No. / Post Code / Region /
          Work Flow Status
        </UncontrolledTooltip>
        <br></br>
        <Collapse isOpen={isOpenFilter}>
          <Card>
            <CardBody>
              <Row>
                <Col>
                  <p>Profile Status</p>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={filterCustom.value === "ACTIVE" ? true : false}
                        onChange={(e) => handleCheck(e)}
                        value="ACTIVE"
                      />
                      <Badge color="success">Active</Badge>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={
                          filterCustom.value === "INACTIVE" ? true : false
                        }
                        onChange={(e) => handleCheck(e)}
                        value="INACTIVE"
                      />
                      <Badge color="secondary">Inactive</Badge>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={
                          filterCustom.value === "DO_NOT_CALL" ? true : false
                        }
                        onChange={(e) => handleCheck(e)}
                        value="DO_NOT_CALL"
                      />{" "}
                      <Badge color="danger">Do not call</Badge>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={
                          filterCustom.value === "DORMANT" ? true : false
                        }
                        onChange={(e) => handleCheck(e)}
                        value="DORMANT"
                      />{" "}
                      <Badge color="warning">Dormant</Badge>
                    </Label>
                  </FormGroup>
                </Col>
                <Col>
                  <p>Speciality </p>

                  <Select
                    // isMulti
                    value={selectedSpecialities}
                    name="candidateSpecialityId"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(data) => setSelectedSpecialities(data)}
                    options={speciality}
                  />
                </Col>
                <Col>
                  <p>Role </p>

                  <Select
                    // isMulti
                    value={selectedRole}
                    name="candidateSpecialityId"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(data) => setSelectedRole(data)}
                    options={role}
                  />
                </Col>
                <Col>
                  <p>Band </p>

                  <Select
                    // isMulti
                    value={selectedBand}
                    name="candidateSpecialityId"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(data) => setSelectedBand(data)}
                    options={band}
                  />
                </Col>
                <Col>
                  <div className="d-flex flex-column align-items-end">
                    <Button
                      color="success m-1 btn-sm"
                      style={{ width: "70px" }}
                      onClick={() => {
                        setsearchAdvanced(!searchAdvanced);
                        handleSearchAdvance();
                      }}
                    >
                      Search
                    </Button>
                    <Button
                      onClick={() => reset()}
                      color="danger m-1 btn-sm"
                      style={{ width: "70px" }}
                    >
                      Reset
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Collapse>
        {/* <label className="ui-check ml-1">
          <Input
            type="checkbox"
            name="id"
            checked={selectAll}
            onChange={() => checkAll()}
          />
          <i></i>
        </label>
        <Label className="text-color text-sm" id="selectAll">
          Select all
        </Label>
        <UncontrolledTooltip placement="right" target="selectAll">
          Mailshot
        </UncontrolledTooltip>
        {selectedItems.length > 0 ? (
          <div className="mb-2">
            <Button
              id="mailshot"
              className="primary mx-3"
              onClick={() => toggleSnapshotModal()}
            >
              Mailshot
            </Button>
            <UncontrolledTooltip placement="right" target="mailshot">
              Send bulk emails to candidates.
            </UncontrolledTooltip>
          </div>
        ) : null}
        {error && !loading &&(
          <div>
            <NoConnection error={error}></NoConnection>
          </div>
        )} */}
        {/* {rows ? (
          rows.length > 0 ? (
            <>
               <div>
                {filterByName(searchQuery, rows).lengthofSearch > 0 ? (
                  <>
                    {filterByName(searchQuery, rows).filtered.map((row, id) => {
                      return (
                        <WorkingCardWidget
                          key={id}
                          userProfile={row}
                          isSelected={(id) => isSelected(id)}
                          onItemSelect={(id) => onItemSelect(id)}
                          selectAll={selectAll}
                        ></WorkingCardWidget>
                      );
                    })}
                  </>
                ) : (
                  <NoSearchResults />
                )}
              </div>
            </>
          ) : (
            <div></div>
            // <NoData />
          )
        ) : (
          <div></div>
        )} */}

        {rows &&
          rows.map((row, index) => {
            if (rows.length === index + 1) {
              return (
                <div ref={lastBookElementRef} key={row.email}>
                  <WorkingCardWidget
                    userProfile={row}
                    isSelected={(id) => isSelected(id)}
                    onItemSelect={(id) => onItemSelect(id)}
                    selectAll={selectAll}
                  ></WorkingCardWidget>
                </div>
              );
            } else {
              return (
                <div
                  key={row.email}
                  style={{ width: "100%", minWidth: "800px" }}
                >
                  <WorkingCardWidget
                    userProfile={row}
                    isSelected={(id) => isSelected(id)}
                    onItemSelect={(id) => onItemSelect(id)}
                    selectAll={selectAll}
                  ></WorkingCardWidget>
                </div>
              );
            }
          })}
        {loading && !error &&(
          <div style={{ width: "100%", minWidth: "800px" }}>
            <CandidateListLoader />
          </div>
        )}
        {rows.length === 0 && !loading && !error && <NoSearchResults />}
      </DashboardLayout>
      {showSnapshotModal ? (
        <ModalComponent
          show={showSnapshotModal}
          header="Mailshot"
          closeModal={() => setShowSnapshotModal(false)}
        >
          <SnapShotNav
            closeModal={() => setShowSnapshotModal(false)}
            user={selectedItemsForSnapshot}
          />
        </ModalComponent>
      ) : null}
    </>
  );
};

function mapStateToProps(state) {
  return {
    specialities: state.initialDataGetReducer.specialities,
    roles: state.initialDataGetReducer.roles,
  };
}

export default connect(mapStateToProps, {})(Candidates);
