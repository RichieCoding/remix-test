const customerFragment = /* GraphQL */ `
  fragment customer on Customer {
      id
      email
      phone
      taxExempt
      acceptsMarketing
      acceptsMarketingUpdatedAt
      firstName
      locale
      lastName
      note
      taxExempt
      taxExemptions
      marketingOptInLevel
      emailMarketingConsent {
        consentUpdatedAt
        marketingOptInLevel
        marketingState
      }
      smsMarketingConsent {
        marketingState
        marketingOptInLevel
      }
      addresses {
        address1
        address2
        city
        company
        country
        countryCode
        firstName
        id
        lastName
        phone
        province
        provinceCode
        zip
      }
    }
  }
`;

export default customerFragment;
