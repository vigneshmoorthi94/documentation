import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, styled } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewOrganization,
  updateOrganization,
  getOrganizationById,
} from "../../redux/organization/organizationActions";
import { getCityList } from "../../redux/city/cityActions";
import { getStateList } from "../../redux/state/stateActions";
import { getCountyList } from "../../redux/county/countyActions";
import {
  DialogComponent,
  TextBoxComponent,
  AutoCompleteComponent,
  ButtonComponent,
} from "../../components";
import { handleCloseWithConfirm } from "../../utils/dialogUtils";
import { defaultOrganizationValues } from "../../constants/organizationConstants";

const OrganizationAddEditWrapper = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export default function OrganizationAddEdit(props) {
  const { open, handleClose, orgId, className } = props;
  const dispatch = useDispatch();
  const {
    organizationDetail,
    cityList,
    stateList,
    countyList,
    loading,
    error,
  } = useSelector((state) => state.organization);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "all",
    defaultValues: defaultOrganizationValues,
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedOrgType, setSelectedOrgType] = useState(null);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleOrgTypeChange = (option, onChange) => {
    setSelectedOrgType(option);
    setShowOtherInput(option?.value === "Founder");
    onChange(option);
  };

  useEffect(() => {
    dispatch(getCityList());
    dispatch(getStateList());
    dispatch(getCountyList());
    if (orgId) {
      dispatch(getOrganizationById({ id: orgId }));
    }
  }, [dispatch, orgId]);

  // Populate form when userDetail changes
  useEffect(() => {
    if (orgId && organizationDetail && cityList && stateList && countyList) {
      // Validate that city, county, and state keys exist in their respective lists
      const cityOption =
        cityList.find((city) => city.key === organizationDetail.city?.key) ||
        null;
      const countyOption =
        countyList.find(
          (county) => county.key === organizationDetail.county?.key
        ) || null;
      const stateOption =
        stateList.find(
          (state) => state.key === organizationDetail.state?.key
        ) || null;

      reset({
        org_name: organizationDetail.org_name || "",
        org_abbrevation: organizationDetail.org_abbrevation || "",
        website: organizationDetail.website || "",
        email: organizationDetail.email || "",
        phone: organizationDetail.phone,
        state_id: stateOption?.key || organizationDetail.state_id?.key || null,
        city_id: cityOption?.key || organizationDetail.city_id?.key || null,
        county_id:
          countyOption?.key || organizationDetail.county_id?.key || null,
        zipcode: organizationDetail.zipcode || "",
        address_line: organizationDetail.address_line || "",
        home_ownership_flag: organizationDetail.home_ownership_flag || false,
        multi_family_flag: organizationDetail.multi_family_flag || false,
        is_archieved: organizationDetail.is_archieved || false,
        is_super_admin: organizationDetail.is_super_admin || false,
        organization_type: organizationDetail.organization_type
          ? {
              key: organizationDetail.organization_type,
              value: organizationDetail.organization_type_name || "Nonprofit",
            }
          : { key: 1, value: "Nonprofit" },
        is_super_funder: organizationDetail.is_super_funder || false,
      });
      // Set abbreviation field visibility if editing
      setShowOtherInput(
        (organizationDetail.organization_type_name || "") === "Founder"
      );
    }
  }, [
    organizationDetail,
    orgId,
    cityList,
    stateList,
    countyList,
    reset,
    getValues,
  ]);

  const onSubmit = (data) => {
    const transformedData = {
      org_name: data.org_name || null,
      org_abbrevation: data.org_abbrevation || null,
      website: data.website || null,
      email: data.email || null,
      phone: data.phone || null,
      extn: data.extn || null,
      state_id: data.state_id?.key || null,
      city_id: data.city_id?.key || null,
      county_id: data.county_id?.key || null,
      country_id: 1,
      zipcode: data.zipcode || null,
      address_line: data.address_line || null,
      home_ownership_flag: data.home_ownership_flag || false,
      multi_family_flag: data.multi_family_flag || false,
      is_archieved: data.is_archieved || false,
      organization_type: data.organization_type?.key || 1,
      is_super_funder: data.is_super_funder || false,
    };
    if (orgId) {
      dispatch(
        updateOrganization({
          id: orgId,
          organizationData: transformedData,
          handleClose,
        })
      );
    } else {
      dispatch(
        addNewOrganization({ organizationData: transformedData, handleClose })
      );
    }
  };

  useEffect(() => {
    if (open) {
      reset(defaultOrganizationValues);
      setShowOtherInput(false);
    }
  }, [open, reset]);

  return (
    <React.Fragment>
      <DialogComponent
        open={open}
        maxWidth="lg"
        disableBackdropClick={true}
        onClose={handleClose}
      >
        <form className="w-100" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3} className={className}>
            <Grid size={12}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h5">Add Organization</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={4}>
              <TextBoxComponent
                name="org_name"
                control={control}
                label="Organization Name"
                type="text"
                required
                placeholder="Enter Organization Name"
                inputProps={{ maxLength: 100 }}
                rules={{ required: "This field is required" }}
              />
            </Grid>
            <Grid size={4}>
              <Controller
                name="organization_type"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field: { onChange, ...field } }) => (
                  <AutoCompleteComponent
                    {...field}
                    options={[
                      { key: 1, value: "Nonprofit" },
                      { key: 2, value: "Private" },
                      { key: 3, value: "Founder" },
                    ]}
                    label="Organization Type"
                    placeholder="Select Organization type"
                    required
                    onChange={(option) => handleOrgTypeChange(option, onChange)}
                  />
                )}
              />
            </Grid>
            {showOtherInput && (
              <Grid size={4}>
                <TextBoxComponent
                  name="abbreviation"
                  control={control}
                  label="Abbreviation"
                  type="text"
                  placeholder="Enter Abbreviation"
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
            )}
            <Grid size={4}>
              <TextBoxComponent
                name="website"
                placeholder="Enter Website"
                control={control}
                label="Website"
                type="text"
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid size={4}>
              <TextBoxComponent
                name="email"
                placeholder="Enter Email id"
                control={control}
                label="Email"
                type="email"
                inputProps={{ maxLength: 100 }}
                rules={{
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  },
                }}
              />
            </Grid>
            <Grid size={4}>
              <Grid size={12}>
                <Grid container spacing={3}>
                  <Grid size={12}>
                    <Grid container spacing={1}>
                      <Grid size={8}>
                        <TextBoxComponent
                          name="phone"
                          placeholder="Enter Phone number"
                          control={control}
                          label="Phone Number"
                          type="phone"
                        />
                      </Grid>
                      <Grid size={4}>
                        <TextBoxComponent
                          name="extn"
                          label="Extn"
                          placeholder="Enter Extn"
                          control={control}
                          type="text"
                          rules={{
                            pattern: {
                              value: /^[0-9]{1,10}$/,
                            },
                          }}
                          inputProps={{
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={4}>
              <TextBoxComponent
                name="address_line"
                control={control}
                label="Address"
                placeholder="Enter Organization address"
                type="text"
                inputProps={{ maxLength: 100 }}
              />
            </Grid>
            <Grid size={4}>
              <AutoCompleteComponent
                name="city_id"
                control={control}
                placeholder="Select City"
                options={cityList || []}
                label="City"
                propertyName="key"
                displayPropertyName="value"
              />
            </Grid>
            <Grid size={4}>
              <AutoCompleteComponent
                name="county_id"
                control={control}
                options={countyList || []}
                placeholder="Select County"
                label="County"
                propertyName="key"
                displayPropertyName="value"
              />
            </Grid>
            <Grid size={4}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Grid container spacing={1}>
                    <Grid size={8}>
                      <AutoCompleteComponent
                        name="state_id"
                        placeholder="Select State"
                        control={control}
                        options={stateList || []}
                        label="State"
                        propertyName="key"
                        displayPropertyName="value"
                      />
                    </Grid>
                    <Grid size={4}>
                      <TextBoxComponent
                        name="zipcode"
                        control={control}
                        label="Zipcode"
                        placeholder="Enter 5-digit ZIP code"
                        type="text"
                        inputProps={{ maxLength: 5 }}
                        rules={{
                          pattern: {
                            value: /^\d{5}$/,
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Grid container sx={{ gap: 1 }} justifyContent="flex-end">
                <Grid item>
                  <ButtonComponent
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      handleCloseWithConfirm(
                        defaultOrganizationValues,
                        getValues,
                        handleClose,
                        setShowConfirmDialog
                      )
                    }
                  >
                    Cancel
                  </ButtonComponent>
                </Grid>
                <Grid item>
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save Changes
                  </ButtonComponent>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogComponent>
      <DialogComponent
        open={showConfirmDialog}
        confirmation
        handleClose={() => {
          setShowConfirmDialog(false);
        }}
        text={
          <Typography variant="h6">Are you sure you want to cancel?</Typography>
        }
        confirmText="Yes"
        cancelText="No"
        handleConfirm={() => {
          handleClose();
          setShowConfirmDialog(false);
        }}
      />
    </React.Fragment>
  );
}