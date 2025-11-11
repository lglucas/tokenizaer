// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/SimpleToken.sol";

contract SimpleTokenTest is Test {
    SimpleToken public token;
    address public creator = address(0x1234);

    function setUp() public {
        vm.prank(creator);
        token = new SimpleToken(
            "Test Token",
            "TEST",
            1000000, // 1M inicial
            18,
            "ipfs://test"
        );
    }

    function test_DeploymentSuccess() public {
        assertEq(token.name(), "Test Token");
        assertEq(token.symbol(), "TEST");
        assertEq(token.decimals(), 18);
        assertEq(token.creator(), creator);
    }

    function test_InitialSupply() public {
        uint256 expectedSupply = 1000000 * 10 ** 18;
        assertEq(token.totalSupply(), expectedSupply);
        assertEq(token.balanceOf(creator), expectedSupply);
    }

    function test_DecimalsVariations() public {
        // Test com diferentes decimals
        SimpleToken token6 = new SimpleToken(
            "USDC",
            "USDC",
            1000000,
            6,
            "ipfs://usdc"
        );
        assertEq(token6.decimals(), 6);
        assertEq(token6.totalSupply(), 1000000 * 10 ** 6);

        SimpleToken token0 = new SimpleToken(
            "SHARES",
            "SHARES",
            100,
            0,
            "ipfs://shares"
        );
        assertEq(token0.decimals(), 0);
        assertEq(token0.totalSupply(), 100);
    }

    function test_Transfer() public {
        address recipient = address(0x5678);
        uint256 amount = 100 * 10 ** 18;

        vm.prank(creator);
        token.transfer(recipient, amount);

        assertEq(token.balanceOf(recipient), amount);
        assertEq(
            token.balanceOf(creator),
            (1000000 * 10 ** 18) - amount
        );
    }

    function test_Approve() public {
        address spender = address(0x9999);
        uint256 amount = 500 * 10 ** 18;

        vm.prank(creator);
        token.approve(spender, amount);

        assertEq(token.allowance(creator, spender), amount);
    }

    function test_TransferFrom() public {
        address spender = address(0x9999);
        address recipient = address(0x5678);
        uint256 amount = 200 * 10 ** 18;

        // Aprovar
        vm.prank(creator);
        token.approve(spender, amount);

        // Transfer from
        vm.prank(spender);
        token.transferFrom(creator, recipient, amount);

        assertEq(token.balanceOf(recipient), amount);
    }

    function test_TokenURIUpdate() public {
        string memory newURI = "ipfs://newhash";

        vm.prank(creator);
        token.setTokenURI(newURI);

        assertEq(token.getTokenURI(), newURI);
    }

    function test_OnlyCreatorCanUpdateURI() public {
        string memory newURI = "ipfs://newhash";
        address notCreator = address(0x1111);

        vm.prank(notCreator);
        vm.expectRevert("Only creator can update URI");
        token.setTokenURI(newURI);
    }

    function test_InvalidDecimals() public {
        vm.expectRevert("Decimals must be <= 18");
        new SimpleToken(
            "Invalid",
            "INV",
            1000000,
            19, // > 18
            "ipfs://test"
        );
    }

    function test_ZeroSupply() public {
        vm.expectRevert("Initial supply must be > 0");
        new SimpleToken(
            "Invalid",
            "INV",
            0,
            18,
            "ipfs://test"
        );
    }
}
