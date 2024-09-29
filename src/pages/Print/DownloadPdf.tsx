import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import { ApplicationResponseType } from '../../Redux/Features/Types';
import React from 'react';


const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    container: {
        border: '1pt solid #708090', // Slate border color
        padding: 10,
    },
    header: {
        borderBottom: '1pt solid black',
        paddingBottom: 10,
        marginBottom: 10,
        position: 'relative',
        textAlign: 'center',
    },
    title: {
        fontSize: 24,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'black',
    },
    subTitle: {
        fontSize: 12,
        marginTop: 5,
        textTransform: 'uppercase',
        fontWeight: 'semibold',
        color: '#334155', // Slate-800 color
    },
    address: {
        fontSize: 12,
        marginTop: 1,
        fontWeight: 'semibold',
        color: '#334155', // Slate-700 color
    },
    website: {
        fontSize: 10,
        marginTop: 1,
        color: 'blue',
    },
    workingHours: {
        fontSize: 10,
        marginTop: 1,
        fontWeight: 'bold',
    },
    logo: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 10,
        left: 20,
    },
    userPhoto: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 10,
        right: 20,
    },
    table: {
        width: '100%',
        borderTop: '1pt solid black',
        borderLeft: '1pt solid black',
        marginTop: 10,
        fontSize: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottom: '1pt solid black',
    },
    cell: {
        flex: 1,
        textAlign : 'left',
        padding: 4,
        borderRight: '1pt solid black',
    },
    colonCell: {
        width: 20, // Fixed width for the colon cell
        padding: 4,
        textAlign: 'center', // Center the colon
        borderRight: '1pt solid black',
    },
    wideCell: {
        flex: 3, // Adjust this flex value to simulate colSpan
        padding: 4,
        textAlign : 'left',
        borderRight: '1pt solid black',
    },
    lastCell: {
        flex: 1,
        padding: 4,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        textAlign : 'center'
    },
    tableBody: {
        backgroundColor: '#fff',
    },
    signatureRow: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signature: {
        borderTop: '1pt solid black',
        paddingTop: '2pt',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

// Create a Document component
const MyDocument = ({ data }: { data: ApplicationResponseType}) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Visa Application</Text>
                    <Text style={styles.subTitle}>Republic of Bangladesh</Text>
                    <Text style={styles.address}>Consular Wing, Khilkhet, Dhaka, Bangladesh</Text>
                    <Text style={styles.website}>https://bangladesh.gov.bd</Text>
                    <Text style={styles.workingHours}>
                        Applications are accepted at the counter from 9:00 am to 12:00 pm (Mon to Fri) only
                    </Text>
                    <Image
                        style={styles.logo}
                        src={'https://res.cloudinary.com/devlj6p7h/image/upload/v1726641755/test/kxk7wjh12clybphmfl1s.png'}
                    />
                    {/* <Image style={styles.userPhoto} src={data?.user_photo} /> */}
                </View>

                {/* Table */}
                <View style={styles.table}>
                    {/* Personal Information Section */}
                    <View style={[styles.row, styles.tableHeader]}>
                        <Text style={styles.wideCell}>Personal Information</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Applicant Name</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.full_name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Applicant Phone</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.phone_number}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Applicant Email</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Present Address</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.present_address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Permanent Address</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.permanent_address}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Date of Birth</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.date_of_birth}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Nationality</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.nationality}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Division</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.state_province}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>City</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.city}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Gender</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.gender}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Marital Status</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.marital_status}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Education</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.educational_background}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Occupation</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.occupation}</Text>
                    </View>

                    {/* Passport Information Section */}
                    <View style={[styles.row, styles.tableHeader]}>
                        <Text style={styles.wideCell}>Passport Information</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Passport Number</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.passport_no}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Date of Issue</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.passport_issue_date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Date of Expiry</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.passport_expiry_date}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Place of Issue</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.country_of_passport_issuance}</Text>
                    </View>

                    {/* Visa Information Section */}
                    <View style={[styles.row, styles.tableHeader]}>
                        <Text style={styles.wideCell}>Visa Information</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Visa Type</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.visa_type}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Duration of Stay</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.planned_duration_of_stay}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Purpose of Visit</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.purpose_of_visit}</Text>
                    </View>

                    {/* Emergency Contact Information Section */}
                    <View style={[styles.row, styles.tableHeader]}>
                        <Text style={styles.wideCell}>Emergency Contact Information</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Contact Name</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.emergency_contact_name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Contact Email</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.emergency_contact_email}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Relationship</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.emergency_contact_relationship}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Phone</Text>
                        <Text style={styles.colonCell}>:</Text>
                        <Text style={styles.wideCell}>{data?.emergency_contact_phone}</Text>
                    </View>
                </View>

                {/* Signatures */}
                <View style={styles.signatureRow}>
                    <Text style={styles.signature}>Applicant Signature</Text>
                    <Text style={styles.signature}>Receiver Signature</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const DownloadPdf = React.memo(({ applicationDetails, children }: { applicationDetails: ApplicationResponseType, children : React.ReactNode  }) => {
    return (
        <div>
            <PDFDownloadLink document={<MyDocument data={applicationDetails} />} fileName="e-visa.pdf">
                {({ loading }) =>
                    loading ?
                        children
                        :
                        children
                }
            </PDFDownloadLink>
        </div>
    );
});

export default DownloadPdf;
