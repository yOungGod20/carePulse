"use client";
import React, { Suspense, useState, useTransition } from "react";
import { Form, FormControl } from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FormFieldType, loginForm } from "@/schema/zod/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItemField from "./FormItemField";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Message from "../alert/Message";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "./FileUploader";
import { PatientFormValidation } from "@/schema/zod/validation";
import { createPatient } from "@/actions/patient.action";
import { Button } from "../ui/button";
import { ThickArrowRightIcon } from "@radix-ui/react-icons";
const PatientForm = ({ user }: { user: User | undefined }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    const patientData = {
      userId: user?.$id,
      ...values,
      birthDate: new Date(values.birthDate),
      identificationDocument: formData,
    };

    try {
      setError("");
      setSuccess("");
      startTransition(async () => {
        const newUser = await createPatient(patientData);
        if (newUser) {
          setSuccess("Created successfully");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section>
          <div className="space-y-1">
            <h2 className="sub-header">Personal Information</h2>
            <FormItemField
              label="Name"
              control={form.control}
              name="name"
              fieldType={FormFieldType.INPUT}
              placeholder="Username"
              disable={isPending}
              iconAlt="name"
              iconSrc="/assets/icons/user.svg"
            />
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="email"
                label="Email"
                fieldType={FormFieldType.INPUT}
                placeholder="1746519797@qq.com"
                disable={isPending}
                iconAlt="email"
                iconSrc="/assets/icons/email.svg"
              />
              <FormItemField
                control={form.control}
                name="phone"
                label="Phone"
                fieldType={FormFieldType.PHONE_INPUT}
                disable={isPending}
              />
            </div>
            <div className="flex w-full gap-8 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="birthDate"
                label="Date of Birth"
                fieldType={FormFieldType.DATA_PICKER}
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="gender"
                label="Gender"
                fieldType={FormFieldType.SKELETON}
                disable={isPending}
                renderSkeleton={(field) => {
                  return (
                    <FormControl>
                      <RadioGroup
                        className="flex h-11 gap-6 xl:justify-between"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {GenderOptions.map((option) => (
                          <div key={option} className="radio-group">
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  );
                }}
              />
            </div>
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="address"
                label="Address"
                fieldType={FormFieldType.INPUT}
                placeholder=""
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="occupation"
                label="Occupation"
                fieldType={FormFieldType.INPUT}
                placeholder="程序员"
                disable={isPending}
              />
            </div>
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="emergencyContactName"
                label="EmergencyContactName"
                fieldType={FormFieldType.INPUT}
                placeholder="Guardian`s name"
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="emergencyContactNumber"
                label="EmergencyContactNumber"
                fieldType={FormFieldType.PHONE_INPUT}
                disable={isPending}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="space-y-4">
            <h2 className="sub-header mb-8">Medical Information</h2>
            <FormItemField
              control={form.control}
              name="primaryPhysician"
              label="PrimaryPhysician"
              fieldType={FormFieldType.SELECT}
              disable={isPending}
            >
              {Doctors.map((doctor) => {
                return (
                  <SelectItem
                    key={doctor.name}
                    value={doctor.name}
                    className="hover:bg-dark-600"
                  >
                    <div className="flex cursor-pointer  gap-2 items-center ">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        width={32}
                        height={32}
                        className="rounded-full border border-dark-500"
                      />
                      <p>{doctor.name}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </FormItemField>
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="insuranceProvider"
                label="InsuranceProvider"
                fieldType={FormFieldType.INPUT}
                placeholder="Blue Shield"
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="insurancePolicyNumber"
                label="InsurancePolicyNumber"
                fieldType={FormFieldType.INPUT}
                disable={isPending}
              />
            </div>
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="allergies"
                label="Allergies (if any)"
                fieldType={FormFieldType.TEXTAREA}
                placeholder="ex:Peanuts"
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="currentMedications"
                label="CurrentMedications"
                fieldType={FormFieldType.TEXTAREA}
                placeholder="ex:Ibuprofen 200mg"
                disable={isPending}
              />
            </div>
            <div className="flex w-full gap-2 flex-col xl:flex-row">
              <FormItemField
                control={form.control}
                name="familyMedicalHistory"
                label="Family medical history "
                fieldType={FormFieldType.TEXTAREA}
                placeholder="ex: heart atack"
                disable={isPending}
              />
              <FormItemField
                control={form.control}
                name="pastMedicalHistory"
                label="Past medical history"
                placeholder="ex:Asthma diagnosis in childhood"
                fieldType={FormFieldType.TEXTAREA}
                disable={isPending}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="space-y-4">
            <h2 className="sub-header mb-8">Identification and Verification</h2>
            <FormItemField
              control={form.control}
              name="identificationType"
              label="Identification type"
              fieldType={FormFieldType.SELECT}
              disable={isPending}
              placeholder="Select an identification type"
            >
              {IdentificationTypes.map((Identification) => {
                return (
                  <SelectItem
                    key={Identification}
                    value={Identification}
                    className="hover:bg-dark-600"
                  >
                    <div className="flex cursor-pointer  gap-2 items-center ">
                      <p>{Identification}</p>
                    </div>
                  </SelectItem>
                );
              })}
            </FormItemField>
            <FormItemField
              control={form.control}
              name="identificationNumber"
              label="Identification number"
              fieldType={FormFieldType.INPUT}
              disable={isPending}
            />
            <FormItemField
              control={form.control}
              name="identificationDocument"
              label="Scanned copy of identification document"
              fieldType={FormFieldType.SKELETON}
              disable={isPending}
              renderSkeleton={(field) => {
                return (
                  <FormControl>
                    <FileUploader
                      onChange={field.onChange}
                      files={field.value}
                    ></FileUploader>
                  </FormControl>
                );
              }}
            />
          </div>
        </section>
        <section>
          <div className="space-y-4">
            <h2 className="sub-header mb-8">Consent and Privacy</h2>
            <FormItemField
              name="treatmentConsent"
              fieldType={FormFieldType.CHECK_BOX}
              control={form.control}
              disable={isPending}
              placeholder="I consent to receive treatment for my health condition"
            ></FormItemField>
            <FormItemField
              name="disclosureConsent"
              fieldType={FormFieldType.CHECK_BOX}
              control={form.control}
              disable={isPending}
              placeholder="I consent to the use and disclosure of my health information for treatment purpose"
            ></FormItemField>
            <FormItemField
              name="privacyConsent"
              fieldType={FormFieldType.CHECK_BOX}
              control={form.control}
              disable={isPending}
              placeholder="I acknowledge that i have reviewed and agree to the privacy policy"
            ></FormItemField>
          </div>
        </section>

        {error && (
          <Message
            classname="text-[#dc2626] border-[#b91c1c]"
            title="Error"
            message={error}
          />
        )}
        {success && (
          <Message
            classname="text-green-400 border-green-400"
            title="Success"
            message={success}
          />
        )}

        {success ? (
          <Button
            className="shadcn-primary-btn w-full bg-green-500 hover:bg-green-500/75 font-bold"
            type="button"
            onClick={() => {
              router.push(`/patients/${user?.$id}/new-appointment`);
            }}
          >
            To submit appointment now!
            <ThickArrowRightIcon className="h-6 w-6 " />
          </Button>
        ) : (
          <SubmitButton className="mt-4" isLoading={isPending}>
            Get Started
          </SubmitButton>
        )}
      </form>
    </Form>
  );
};

export default PatientForm;
