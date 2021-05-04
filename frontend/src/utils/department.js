export const getDepartmentInitials = ({ name, departmentClass }) => {
  if (!name || !departmentClass) { return ''; }
  return `${name[0]}-${departmentClass}`;
};
