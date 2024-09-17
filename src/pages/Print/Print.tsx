import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    rootView: {
        border: 1,
        borderColor: '#64748b',
        borderStyle: 'solid',
        padding: 8
    },
    page: {
        backgroundColor: '#fff',
        height: 500,
        minWidth: 1000,
        padding: 8
    },
    section: {
        margin: 10,
        padding: 10,
        flex: 1,
        flexDirection : 'column'
    },
});

// Create Document Component
const MyDocument = () => (
    <Document title='Document Title'>
        <Page size="A4" style={styles.page}>
            <View style={styles.rootView}>
                <View style={styles.section}>
                    <Text style={{ fontSize: 30, color: 'black', textAlign: 'center', fontWeight: 'bold', textTransform : 'uppercase'}}>Visa Application</Text>
                    <Text style={{textAlign : 'center', color : '#1e293b', fontSize : 24, fontWeight : 'semibold', textTransform : 'uppercase'}}>Republic of Bangladesh</Text>
                    {/* <Text className='text-center text-base text-slate-700 font-semibold uppercase'>Consular wing</Text>
                    <Text className='text-center text-base text-slate-700 font-semibold'>Khilkhet, Dhaka, Bangladesh</Text> */}
                </View>

            </View>
        </Page>
    </Document>
);

const Print = () => {
    return (
        <div>
            <PDFDownloadLink document={<MyDocument />} fileName="e-visa.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </div>
    );
};

export default MyDocument;
