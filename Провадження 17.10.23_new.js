function setProgramEducational() {
  const ProgramEducational =
    EdocsApi.getAttributeValue("ProgramEducational").value;
  if (ProgramEducational) {
    const itemId = EdocsApi.getDictionaryData(
      "Programs",
      ProgramEducational,
      []
    );
    if (itemId && itemId.length > 0) {
      const item = EdocsApi.getDictionaryItemData("Programs", itemId[0].id);
      try {
        //  EdocsApi.setAttributeValue({code: 'ProgDean', value: EdocsApi.getEmployeeDataByPersonExtID(item.attributes.find(x=>x.code == "ProgDean").value).employeeId, text: null});
        EdocsApi.setAttributeValue({
          code: "ProgChief",
          value: EdocsApi.getEmployeeDataByPersonExtID(
            item.attributes.find((x) => x.code == "ProgChief").value
          ).employeeId,
          text: null,
        });
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    // EdocsApi.setAttributeValue({code: 'ProgDean', value: null, text: null});
    EdocsApi.setAttributeValue({ code: "ProgChief", value: null, text: null });
  }
}

function setPropertyHidden(attributeName, boolValue = true) {
  debugger;
  //приховане
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.hidden = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyRequired(attributeName, boolValue = true) {
  //обов"язкове
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.required = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function clearAttribute(attributeCode, doNotClearOnInit, isDictionary) {
  //очищення
  if (doNotClearOnInit) {
    return;
  }
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = null;
  attribute.text = null;
  if (isDictionary) {
    attribute.itemCode = null;
    attribute.itemDictionary = null;
  }
  EdocsApi.setAttributeValue(attribute);
}

function onCardInitialize() {
  onChangeProceedings();
}
function onChangeProceedings() {
  var Proceedings = EdocsApi.getAttributeValue("Proceedings").value;
  if (Proceedings) {
    switch (Proceedings) {
      case "Студент":
        setPropertyHidden("Student", false);
        setPropertyHidden("Info", false);

        setPropertyRequired("STD_NAME");
        //Викладач
        setPropertyHidden("Teacher");
        setPropertyHidden("info2");

        setPropertyRequired("TeacherName", false);

        clearAttribute("Teacher");
        clearAttribute("info2");
        clearAttribute("TeacherDep");
        clearAttribute("TeacherPosition");
        clearAttribute("TeacherDep");
        break;

      case "Викладач":
        debugger;
        //Студент
        setPropertyHidden("Info");
        setPropertyHidden("Student");

        setPropertyRequired("STD_NAME", false);

        clearAttribute("Info");
        clearAttribute("STD_NAME");
        clearAttribute("STD_IDNUM");
        clearAttribute("ProgramEducational");
        clearAttribute("StdGroup");
        clearAttribute("STD_LEVEL");
        clearAttribute("StdDep");
        clearAttribute("StdEmail");
        clearAttribute("StdPhone");
        clearAttribute("Student");
        clearAttribute("STD_PAY");
        clearAttribute("StdSpc");
        //Викладач
        setPropertyHidden("Teacher", false);
        setPropertyHidden("info2", false);

        setPropertyRequired("TeacherName");
        break;

      default:
        break;
    }
  } else {
    //Студент
    setPropertyHidden("Student");
    setPropertyHidden("Info");
    //Викладач
    setPropertyHidden("Teacher");
    setPropertyHidden("info2");
  }
}
function onChangeStudent() {
  var Student = EdocsApi.getAttributeValue("Student").value;
  if (Student) {
    var arr = EdocsApi.getDictionaryItemData("Students", Student);
    if (arr) {
      EdocsApi.setAttributeValue({
        code: "STD_NAME",
        value: arr.attributes.find((x) => x.code == "StdName").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "STD_IDNUM",
        value: arr.attributes.find((x) => x.code == "StdIdnum").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "STD_ID",
        value: arr.attributes.find((x) => x.code == "StdId").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "STD_LEVEL",
        value: arr.attributes.find((x) => x.code == "StdLevel").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdPhone",
        value: arr.attributes.find((x) => x.code == "StdPhone").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "ProgramEducational",
        value: arr.attributes.find((x) => x.code == "StdProg").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdDep",
        value: arr.attributes.find((x) => x.code == "StdDiv").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdEmail",
        value: arr.attributes.find((x) => x.code == "StdEmail").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdGroup",
        value: arr.attributes.find((x) => x.code == "StdGroup").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "StdSpc",
        value: arr.attributes.find((x) => x.code == "StdSpc").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "STD_PAY",
        value: arr.attributes.find((x) => x.code == "StdPay").value,
        text: null,
      });
    }
  } else {
    EdocsApi.setAttributeValue({ code: "STD_NAME", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "STD_IDNUM", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "STD_ID", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "STD_LEVEL", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdPhone", value: null, text: null });
    EdocsApi.setAttributeValue({
      code: "ProgramEducational",
      value: null,
      text: null,
    });
    EdocsApi.setAttributeValue({ code: "StdDep", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdEmail", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdGroup", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdSpc", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "StdPay", value: null, text: null });
  }
  setProgramEducational();
}

function onChangeTeacher() {
  var Teacher = EdocsApi.getAttributeValue("Teacher").value;
  if (Teacher) {
    var arr = EdocsApi.getDictionaryItemData("Teachers", Teacher);
    if (arr) {
      EdocsApi.setAttributeValue({
        code: "TeacherName",
        value: arr.attributes.find((x) => x.code == "TeachName").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "TeacherId",
        value: arr.attributes.find((x) => x.code == "TeachId").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "TeacherDep",
        value: arr.attributes.find((x) => x.code == "TeachDiv").value,
        text: null,
      });
      EdocsApi.setAttributeValue({
        code: "TeacherPosition",
        value: arr.attributes.find((x) => x.code == "TeachStaf").value,
        text: null,
      });
    }
  } else {
    EdocsApi.setAttributeValue({
      code: "TeacherName",
      value: null,
      text: null,
    });
    EdocsApi.setAttributeValue({ code: "TeacherId", value: null, text: null });
    EdocsApi.setAttributeValue({ code: "TeacherDep", value: null, text: null });
    EdocsApi.setAttributeValue({
      code: "TeacherPosition",
      value: null,
      text: null,
    });
  }
}

function onTaskExecuteRegistration(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    EdocsApi.setAttributeValue({
      code: "NumberProceedings",
      value: EdocsApi.getAttributeValue("RegNumber").value,
      text: null,
    });
  }
}
